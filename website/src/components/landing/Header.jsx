import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { APP_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Шапка сайта с динамическим поведением при скролле и переключателем темы.
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "pt-2 md:pt-4 px-4" : "pt-4 md:pt-6 px-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        <div
          className={`rounded-2xl border border-main-theme/10 bg-white/75 dark:bg-gray-950/75 backdrop-blur-xl transition-all duration-500 overflow-hidden relative ${
            isScrolled ? "shadow-xl" : "shadow-lg"
          }`}
        >
          {/* Градиентная линия сверху */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] gradient-border-line" />

          <div
            className={`flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 ${
              isScrolled ? "p-2 md:px-6 md:py-3" : "p-3 md:p-5"
            }`}
          >
            {/* Верхний ряд: Лого + Действия (на мобилках в одну линию) */}
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Логотип */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="size-6 md:size-8 text-main-theme group-hover:rotate-12 transition-transform">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="8" width="18" height="4" rx="1" />
                    <path d="M12 8v13" />
                    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                  </svg>
                </div>
                <div className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                  <span className="gradient-text">GiftoYou</span>
                </div>
              </Link>

              {/* Кнопки действий для мобилок (когда md:hidden) */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="size-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                >
                  {isDark ? (
                    <Sun className="size-4" />
                  ) : (
                    <Moon className="size-4" />
                  )}
                </button>
                <Button
                  asChild
                  className="h-9 px-4 text-xs font-bold bg-main-theme text-gray-900 rounded-lg"
                >
                  <a href={APP_URL}>Начать</a>
                </Button>
              </div>
            </div>

            {/* Панель навигации (центр на десктопе, второй ряд на мобилках) */}
            <nav className="flex items-center justify-center gap-6 md:gap-8 mt-3 md:mt-0 text-xs md:text-sm font-bold text-gray-600 dark:text-gray-300">
              <Link
                to="/ideas"
                className="hover:text-main-theme transition-colors"
              >
                Идеи подарков
              </Link>
              <Link
                to="/blog"
                className="hover:text-main-theme transition-colors"
              >
                Блог
              </Link>
            </nav>

            {/* Кнопки действий для десктопа (скрыты на мобилках) */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="size-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-main-theme transition-all"
              >
                {isDark ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </button>
              <Button
                asChild
                className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-6 px-8 rounded-xl text-base shadow-sm transition-all hover:scale-105 active:scale-95 btn-glow"
              >
                <a href={APP_URL}>Войти</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
