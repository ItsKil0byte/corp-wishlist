import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LinkService from "@/services/LinkService.js";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function LinkDispatcher() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const dispatch = async () => {
      try {
        const token =
          searchParams.get("start_param") || searchParams.get("token");
        const isAuth = !!localStorage.getItem("token");

        if (!token) {
          navigate(isAuth ? "/wishlists" : "/auth", { replace: true });
          return;
        }

        const entity = await LinkService.getEntity(token);

        if (entity.type === "WISHLIST_SHARE") {
          navigate(`/shared/${token}`, { replace: true });
          return;
        }

        if (entity.type === "GROUP_INVITE") {
          if (!isAuth) {
            localStorage.setItem("pending_invite", token);
            toast("Войдите или зарегистрируйтесь, чтобы вступить в группу", {
              icon: "👋",
            });
            navigate("/auth", { replace: true });
            return;
          }

          const tId = toast.loading("Присоединение к группе...");
          await LinkService.joinToGroup(token);
          toast.success("Вы успешно вступили в группу!", { id: tId });
          navigate("/groups", { replace: true });
        }
      } catch (error) {
        console.error("Ошибка при обработке ссылки:", error);
        setError(true);
      }
    };

    dispatch();
  }, [navigate, searchParams]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Ссылка устарела или недействительна
        </h1>
        <button
          onClick={() => {
            setError(false);
            navigate("/");
          }}
          className="text-main-theme font-bold hover:underline"
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <Loader2 className="h-10 w-10 text-main-theme animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Обрабатываем ссылку...</p>
    </div>
  );
}
