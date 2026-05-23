import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { APP_URL } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full pt-6 px-4 md:px-8 pb-2 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto">
        <div className="rounded-2xl border border-main-theme/10 bg-white/75 backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden relative">
          {/* Градиентная линия */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] gradient-border-line" />

          <div className="flex flex-wrap justify-between items-center p-4 md:p-5 gap-y-4">
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
              <div className="text-2xl font-black text-gray-900 tracking-tighter">
                <span className="gradient-text">GiftoYou</span>
              </div>
            </Link>

            {/* Панель навигации */}
            <nav className="flex items-center justify-center gap-8 text-sm font-bold text-gray-900 w-full md:w-auto order-3 md:order-2">
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

            {/* Кнопка входа */}
            <Button
              asChild
              className="order-2 md:order-3 bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-6 px-8 md:px-12 md:py-8 rounded-xl text-sm md:text-lg shadow-sm transition-all hover:scale-105 active:scale-95 btn-glow"
            >
              <a href={APP_URL}>Войти</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
