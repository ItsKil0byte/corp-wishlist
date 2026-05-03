import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="space-y-6 max-w-md">
        <h1 className="text-8xl font-black text-main-theme select-none tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-bold tet-gray-900">Страница не найдена</h2>
        <p className="text-gray-600 leading-relaxed">
          Запрашиваемый ресурс не существует или был перемещён.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild variant="default" className="gap-2 h-12">
            <Link to="/">
              <Home className="size-4" /> Вернуться на главную
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2 h-12"
          >
            <ArrowLeft className="size-4" /> Назад
          </Button>
        </div>
      </div>
    </div>
  );
}
