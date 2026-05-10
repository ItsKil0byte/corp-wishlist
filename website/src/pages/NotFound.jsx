import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="Страница не найдена" />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="space-y-6 max-w-md relative">
          <h1 className="text-8xl leading-none font-black text-main-theme select-none tracking-tight">
            404
          </h1>
          <h2 className="text-2xl font-black tet-gray-900">
            Кажется, вы попали куда-то не туда
          </h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            Страница, которую вы ищете, была удалена или переименована.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              onClick={() => navigate(-1)}
              className="bg-main-theme-lite hover:bg-main-theme-lite/70 text-main-theme font-bold gap-2 h-12 px-8 rounded-lg transition-all hover:scale-105"
            >
              <ArrowLeft className="size-5" /> Назад
            </Button>
            <Button
              asChild
              className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold gap-2 h-12 px-8 rounded-lg transition-all hover:scale-105"
            >
              <Link to="/">
                <Home className="size-5" /> Вернуться на главную
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
