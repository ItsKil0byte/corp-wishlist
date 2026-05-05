import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  const appUrl = import.meta.env.VITE_APP_URL || "localhost:3000";

  return (
    <header className="sticky top-4 z-50 w-[calc(100%-2rem)] max-w-7xl mx-auto mt-4 bg-main-theme/20 backdrop-blur-md rounded-lg mb-8 md:mb-12 border-2 border-main-theme/50">
      <div className="mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2 group">
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
            Gifto<span className="text-main-theme">You</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-900">
          <Link to="/ideas" className="hover:text-main-theme transition-colors">
            Идеи подарков
          </Link>
          <Link to="/blog" className="hover:text-main-theme transition-colors">
            Блог
          </Link>
        </nav>

        <Button
          asChild
          className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-6 px-8 rounded-lg text-md shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <a href={appUrl}>Войти</a>
        </Button>
      </div>
    </header>
  );
}
