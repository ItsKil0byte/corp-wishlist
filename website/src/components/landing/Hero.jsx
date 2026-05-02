import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
      <div className="w-full nd:w-1/2 text-left">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
          Вишлист, который <br />
          <span className="text-main-theme">понимает коллег.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
          Создавайте вишлисты, делитесь ими со своими коллегами, объединяйтесь в
          группы и забудьте о выборе подарка в последнюю минуту.
        </p>
        <Button
          asChild
          size="lg"
          className="h-14 px-8 text-lg shadow-md hover:scale-105 transition-transform"
        >
          <a
            href={import.meta.env.VITE_APP_URL || "localhost:3000"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Создать вишлист
          </a>
        </Button>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          src="/mock.jpg"
          alt="Интерфейс приложения"
          loading="lazy"
          decoding="async"
          className="w-3/4 md:w-full max-w-sm nd:max-w-md h-auto"
        />
      </div>
    </section>
  );
}
