import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LinkService from "@/services/LinkService.js";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function LinkDispatcher() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);

  // Попытка обработки повторного захода
  const hasDispatched = useRef(false);

  useEffect(() => {
    if (hasDispatched.current) {
      return;
    }

    const dispatch = async () => {
      hasDispatched.current = true;

      try {
        let token =
          searchParams.get("start_param") || searchParams.get("token");
        const pendingInvite = localStorage.getItem("pending_invite");

        if (!token && pendingInvite) {
          token = pendingInvite;
        }

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

          try {
            await LinkService.joinToGroup(token);
            toast.success("Вы успешно вступили в группу!", { id: tId });
          } catch (error) {
            console.warn(
              "Пользователь уже вступил в группу или произошла ошибка:",
              error,
            );
            toast.success("Вы добавлены в группу!", { id: tId });
          } finally {
            localStorage.removeItem("pending_invite");
            navigate("/groups", { replace: true });
          }
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
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
        <h1 className="mb-4 text-xl font-bold text-gray-900">
          Ссылка устарела или недействительна
        </h1>
        <button
          onClick={() => {
            const isAuth = !!localStorage.getItem("token");
            setError(false);
            localStorage.removeItem("pending_invite");
            navigate(isAuth ? "/wishlists" : "/auth");
          }}
          className="text-main-theme font-bold hover:underline"
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <Loader2 className="text-main-theme mb-4 h-10 w-10 animate-spin" />
      <p className="font-medium text-gray-500">Обрабатываем ссылку...</p>
    </div>
  );
}
