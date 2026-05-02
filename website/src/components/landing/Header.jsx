import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center py-6 mb-12 rounded-lg px-8 shadow-sm bg-main-theme-lite/30 backdrop-blur-sm">
      <div className="text-xl font-black text-main-theme tracking-tighter uppercase">
        Корпоративный <span className="text-gray-900">Вишлист</span>
      </div>
      <Button
        asChild
        size="lg"
        className="shadow-md hover:scale-105 transition-transform"
      >
        <a
          href={import.meta.env.VITE_APP_URL || "localhost:3000"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Войти
        </a>
      </Button>
    </header>
  );
}
