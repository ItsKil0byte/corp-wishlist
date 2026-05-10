import { Button } from "../ui/button";

export default function Hero() {
  const appUrl = import.meta.env.VITE_APP_URL || "localhost:3000";

  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between min-h-[50vh] mt-8 md:mt-16">
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-8">
        <h1 className="text-4xl md:text-[2.75em] font-black text-gray-900 leading-tight md:leading-[1.15]">
          <span className="text-main-theme">GiftoYou</span> - бесплатный сервис,
          помогающий выбирать подарки быстро и просто!
        </h1>

        <Button
          asChild
          className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-8 px-12 rounded-lg text-lg shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <a href={appUrl}>Выбрать идеальный подарок</a>
        </Button>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <div className="w-full aspect-4/3 max-w-lg bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-center">
          <span className="text-5xl">🎥</span>
        </div>
      </div>
    </section>
  );
}
