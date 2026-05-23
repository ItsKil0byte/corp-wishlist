import { Button } from "../ui/button";

export default function Hero() {
  const appUrl = import.meta.env.VITE_APP_URL || "localhost:3000";

  return (
    <section className="flex flex-col items-center text-center gap-10 md:gap-12 pt-12 md:pt-24 px-4">
      <div
        className="w-full flex flex-col items-center gap-8 md:gap-10"
        data-reveal
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.15] md:leading-[1.1] max-w-5xl tracking-tight">
          <span className="gradient-text">GiftoYou</span> — бесплатный сервис,
          помогающий выбирать подарки быстро и просто!
        </h1>

        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl leading-relaxed">
          Создавайте вишлисты, делитесь идеями и организуйте коллективные
          подарки в одном месте. Больше никаких лишних чатов и ненужных вещей.
        </p>

        <Button
          asChild
          className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-8 md:py-10 px-10 md:px-16 rounded-2xl text-lg md:text-xl shadow-xl transition-all hover:scale-105 active:scale-95 btn-glow w-full sm:w-auto"
        >
          <a href={appUrl}>Выбрать идеальный подарок</a>
        </Button>
      </div>

      <div
        className="w-full max-w-5xl mt-6 md:mt-8 glass-frame shadow-2xl"
        data-reveal
        data-reveal-delay="2"
      >
        <div className="w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
          <img
            src="/mockups/what-to-send/app-demo.gif"
            alt="App Demo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
