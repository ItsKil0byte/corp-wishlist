import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start text-sm text-gray-900 font-bold">
          <Link to="/blog" className="hover:text-main-theme transition-colors">
            Блог
          </Link>
          <Link to="/ideas" className="hover:text-main-theme transition-colors">
            Идеи для подарков
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GiftoYou. Все права защищены.
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center md:items-end">
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            Контакты
          </span>
          <a
            href="mailto:giftoyou@mail.ru"
            className="text-main-theme font-bold hover:underline"
          >
            giftoyou@mail.ru
          </a>
        </div>
      </div>
    </footer>
  );
}
