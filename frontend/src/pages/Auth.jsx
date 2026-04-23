import AuthService from "@/services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FallingGifts from "@/components/FallingGifts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [parent] = useAutoAnimate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      toast.error("Пароли не совпадают!");
      return;
    }

    setIsLoading(true);
    const tId = toast.loading("Авторизация...");

    try {
      if (isLogin) {
        await AuthService.loginViaJWT(login, password);
        toast.success("Успешный вход!", { id: tId });
      } else {
        await AuthService.registerViaJWT(login, password);
        toast.success("Успешная регистрация!", { id: tId });
      }

      navigate("/");
    } catch (error) {
      console.error("Ошибка при авторизации/регистрации: ", error);
      toast.error(error.response?.data?.message || "Произошла ошибка!", {
        id: tId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-main-theme-lite flex items-center justify-center overflow-hidden">
      {/* TODO: Заменить на что-нибудь */}
      <div className="absolute inset-0 z-0 opacity-40">
        <FallingGifts />
      </div>

      <Card className="relative w-full max-w-[380px] shadow-xl border bg-white">
        <CardHeader className="text-center py-4">
          <CardTitle className="text-3xl font-black text-gray-900">
            {isLogin ? "Вход" : "Регистрация"}
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent ref={parent} className="space-y-5 px-6">
            <div className="space-y-2">
              <Label htmlFor="login" className="text-gray-900 font-medium">
                Логин
              </Label>
              <Input
                required
                type="text"
                placeholder="Введите логин"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="h-10 text-base px-4 rounded-lg border-2"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900 font-medium">
                Пароль
              </Label>
              <Input
                required
                type="password"
                id="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 text-base px-4 rounded-lg border-2"
                disabled={isLoading}
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-900 font-medium"
                >
                  Подтвердите пароль
                </Label>
                <Input
                  required
                  type="password"
                  id="confirmPassword"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 text-base px-4 rounded-lg border-2"
                  disabled={isLoading}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 px-6 pt-6 pb-6 bg-white border-none">
            <Button
              type="submit"
              className="w-full bg-main-theme hover:bg-main-theme-hover border-2 border-main-theme-border text-gray-900 font-bold text-base h-12"
              disabled={isLoading}
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full h-12 text-gray-900 font-semibold text-base border-2 border-gray-200 hover:bg-gray-200"
              onClick={() => {
                setIsLogin(!isLogin);
                setLogin("");
                setPassword("");
                setConfirmPassword("");
              }}
              disabled={isLoading}
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
