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
    <div className="bg-main-theme-lite relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* TODO: Заменить на что-нибудь */}
      <div className="absolute inset-0 z-0 opacity-40">
        <FallingGifts />
      </div>

      <Card className="relative w-full max-w-[380px] border bg-white shadow-xl">
        <CardHeader className="py-4 text-center">
          <CardTitle className="text-3xl font-black text-gray-900">
            {isLogin ? "Вход" : "Регистрация"}
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent ref={parent} className="space-y-5 px-6">
            <div className="space-y-2">
              <Label htmlFor="login" className="font-medium text-gray-900">
                Логин
              </Label>
              <Input
                required
                type="text"
                placeholder="Введите логин"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="h-10 rounded-lg border-2 px-4 text-base"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium text-gray-900">
                Пароль
              </Label>
              <Input
                required
                type="password"
                id="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-lg border-2 px-4 text-base"
                disabled={isLoading}
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="font-medium text-gray-900"
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
                  className="h-10 rounded-lg border-2 px-4 text-base"
                  disabled={isLoading}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-none bg-white px-6 pt-6 pb-6">
            <Button
              type="submit"
              className="bg-main-theme hover:bg-main-theme-hover border-main-theme-border h-12 w-full border-2 text-base font-bold text-gray-900"
              disabled={isLoading}
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="h-12 w-full border-2 border-gray-200 text-base font-semibold text-gray-900 hover:bg-gray-200"
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
