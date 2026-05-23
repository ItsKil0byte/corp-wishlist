import { Link } from "react-router-dom";
import { APP_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="w-full pt-16 pb-12 mt-20 relative bg-white/40 backdrop-blur-md border-t border-main-theme/10"
      style={{ zIndex: 1 }}
    >
      {/* Градиентная линия */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] gradient-border-line" />

      <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-3 items-center md:items-start">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 group mb-2">
            <div className="text-2xl font-black text-gray-900 tracking-tighter">
              <span className="gradient-text">GiftoYou</span>
            </div>
          </Link>

          {/* Навигация */}
          <div className="flex flex-col gap-2 items-center md:items-start text-sm text-gray-600 font-medium">
            <Link
              to="/blog"
              className="hover:text-main-theme transition-colors"
            >
              Блог
            </Link>
            <Link
              to="/ideas"
              className="hover:text-main-theme transition-colors"
            >
              Идеи для подарков
            </Link>
          </div>
        </div>

        {/* Копирайт */}
        <div className="text-center order-last md:order-0">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} GiftoYou. Все права защищены.
            <br />
            Создано с любовью 💚🩵
          </p>
        </div>

        {/* Контакты */}
        <div className="flex flex-col gap-2 items-center md:items-end">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">
            Контакты
          </span>
          <a
            href="mailto:giftoyou@mail.ru"
            className="text-main-theme font-black hover:underline text-lg"
          >
            <span className="gradient-text">giftoyou@mail.ru</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
