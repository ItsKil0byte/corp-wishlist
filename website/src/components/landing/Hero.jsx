import { APP_URL } from "@/lib/constants";
import { Button } from "../ui/button";
import FloatingDecor from "./FloatingDecor";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center gap-10 md:gap-12 pt-12 md:pt-24 px-4 relative">
      <FloatingDecor />
      <div
        className="w-full flex flex-col items-center gap-8 md:gap-10 relative z-10"
        data-reveal
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.15] md:leading-[1.1] max-w-5xl tracking-tight">
          Больше никаких «что тебе подарить?». Твой идеальный вишлист
          <br /> <span className="gradient-text">в одной ссылке</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-3xl leading-relaxed">
          Создавайте вишлисты, которыми приятно делиться. GiftoYou помогает
          друзьям и коллегам выбирать именно то, что вы хотите. Бесплатно и без
          лишнего шума.
        </p>

        <Button
          asChild
          className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-8 md:py-10 px-10 md:px-16 rounded-2xl text-lg md:text-xl shadow-xl transition-all hover:scale-105 active:scale-95 btn-glow w-full sm:w-auto"
        >
          <a href={APP_URL}>Выбрать идеальный подарок</a>
        </Button>
      </div>

      <div
        className="w-full max-w-5xl mt-6 md:mt-8 flex justify-center"
        data-reveal
        data-reveal-delay="2"
      >
        <div className="relative group">
          {/* Десктопный скриншот с мобильным акцентом */}
          <div className="glass-frame shadow-2xl relative z-10 hidden md:block overflow-hidden">
            <div className="w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src="/mockups/what-to-send/app-demo.gif"
                alt="App Demo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Мобильная версия (iPhone-style frame) поверх или рядом */}
          <div className="md:absolute -right-12 -bottom-12 w-[280px] h-[560px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl z-20 hidden lg:block overflow-hidden hover:scale-105 transition-transform duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-30" />
            <img
              src="/mockups/phone-mock.png"
              alt="Mobile App"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Мобильный вид для маленьких экранов */}
          <div className="block lg:hidden w-full max-w-[320px] mx-auto border-4 border-gray-900 rounded-[2.5rem] p-2 bg-gray-900 shadow-xl">
            <img
              src="/mockups/for-groups/wishlist.png"
              alt="Mobile App"
              className="w-full rounded-[2rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
