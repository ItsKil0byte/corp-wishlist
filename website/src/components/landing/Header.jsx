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
        isScrolled ? "pt-2 md:pt-4 px-4 md:px-12" : "pt-6 px-4 md:px-8"
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        <div
          className={`rounded-2xl border border-main-theme/10 bg-white/75 dark:bg-gray-900/75 backdrop-blur-xl transition-all duration-500 overflow-hidden relative ${
            isScrolled ? "shadow-xl py-1" : "shadow-lg"
          }`}
        >
          {/* Градиентная линия */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] gradient-border-line" />

          <div
            className={`flex flex-wrap justify-between items-center transition-all duration-500 gap-y-4 ${
              isScrolled ? "p-3 md:px-6 md:py-3" : "p-4 md:p-5"
            }`}
          >
            {/* Логотип */}
            <Link to="/" className="flex items-center gap-2 group order-1">
              <div className="size-8 text-main-theme group-hover:rotate-12 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
              <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                <span className="gradient-text">GiftoYou</span>
              </div>
            </Link>

            {/* Панель навигации */}
            <nav className="flex items-center justify-center gap-8 text-sm font-bold text-gray-900 dark:text-gray-100 w-full md:w-auto order-3 md:order-2">
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

            {/* Кнопки действий */}
            <div className="flex items-center gap-3 md:gap-6 order-2 md:order-3">
              {/* Переключатель темы */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="size-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-main-theme dark:hover:text-main-theme transition-all"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </button>

              <a
                href={APP_URL}
                className="text-sm md:text-base font-bold text-gray-500 dark:text-gray-400 hover:text-main-theme transition-colors cursor-pointer hidden sm:block"
              >
                Войти
              </a>
              <Button
                asChild
                className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-5 px-6 md:px-10 md:py-7 rounded-xl text-sm md:text-base shadow-sm transition-all hover:scale-105 active:scale-95 btn-glow"
              >
                <a href={APP_URL}>Начать бесплатно</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
