import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Страница не найдена | GiftoYou"
        description="К сожалению, такой страницы не существует."
      />
      <div className="min-h-[70vh] max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="relative mb-12" data-reveal>
          <div className="text-[10rem] md:text-[14rem] font-black text-main-theme/10 dark:text-main-theme/60 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-24 md:size-32 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-2xl border border-gray-50 dark:border-gray-700 rotate-6">
              <Home className="size-12 md:size-16 text-main-theme" />
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-2xl" data-reveal data-reveal-delay="1">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            Упс! Страница потерялась
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-300 font-medium leading-relaxed">
            Кажется, мы не можем найти то, что вы ищете. Возможно, ссылка
            устарела или была введена с ошибкой.
          </p>
        </div>

        <div className="mt-16" data-reveal data-reveal-delay="2">
          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-10 px-16 rounded-xl text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 btn-glow"
          >
            <Link to="/" className="flex items-center gap-3">
              <ArrowLeft className="size-6" /> Вернуться на главную
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
