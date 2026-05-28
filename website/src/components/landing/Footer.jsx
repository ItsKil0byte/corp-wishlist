import { Link } from "react-router-dom";

/**
 * Обновленный подвал сайта с разделением на колонки.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-20 pb-12 mt-20 relative bg-white/40 backdrop-blur-md border-t border-main-theme/10">
      {/* Градиентная линия */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] gradient-border-line" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Колонка 1: Логотип */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black text-gray-900 tracking-tighter">
                <span className="gradient-text">GiftoYou</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[200px]">
              Создавайте вишлисты и дарите радость друзьям и близким.
            </p>
          </div>

          {/* Колонка 2: Продукт */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gray-900 font-black text-sm uppercase tracking-widest">
              Продукт
            </h4>
            <nav className="flex flex-col gap-3 text-gray-500 text-sm font-bold">
              <Link to="/" className="hover:text-main-theme transition-colors">
                Главная
              </Link>
              <Link
                to="/for-groups"
                className="hover:text-main-theme transition-colors"
              >
                Группы
              </Link>
              <Link
                to="/create-wishlist"
                className="hover:text-main-theme transition-colors"
              >
                Вишлисты
              </Link>
            </nav>
          </div>

          {/* Колонка 3: Ресурсы */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gray-900 font-black text-sm uppercase tracking-widest">
              Ресурсы
            </h4>
            <nav className="flex flex-col gap-3 text-gray-500 text-sm font-bold">
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
                Идеи подарков
              </Link>
            </nav>
          </div>

          {/* Колонка 4: Связь */}
          <div className="flex flex-col gap-5">
            <h4 className="text-gray-900 font-black text-sm uppercase tracking-widest">
              Связь
            </h4>
            <div className="flex flex-col gap-3 text-gray-500 text-sm font-bold">
              <a
                href="mailto:giftoyou@mail.ru"
                className="hover:text-main-theme transition-colors"
              >
                giftoyou@mail.ru
              </a>
              <a
                href="https://t.me/corpwishlist"
                target="_blank"
                rel="noreferrer"
                className="hover:text-main-theme transition-colors"
              >
                Поддержка
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя часть подвала */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm font-medium">
            © {currentYear} GiftoYou. Все права защищены. Создано с любовью 💚🩵
          </p>
          <div className="flex gap-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
