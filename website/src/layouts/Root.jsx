import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b-2 border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold text-main-theme text-xl">
            CorpWishlist
          </span>
          <a
            href={"#" || import.meta.env.VITE_APP_URL}
            className="text-sm text-gray-600 hover:text-main-theme"
          >
            Войти в приложение →
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t-2 border-gray-100 py-6 text-center text-sm text-gray-500">
        Сделано с любовью студентами ИИТ
      </footer>
    </div>
  );
}
