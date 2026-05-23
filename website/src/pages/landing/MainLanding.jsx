import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LandingLayout from "@/layouts/LandingLayout";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

export default function MainLanding() {
  return (
    <LandingLayout 
        title="GiftoYou | Выбирайте подарки быстро и просто" 
        description="Бесплатный сервис для организации вишлистов и подарков."
    >
      <div className="w-full flex flex-col gap-12 md:gap-24 pb-24">
        <Hero />
        <Features />

        <div
          className="w-full flex flex-col items-center text-center gap-10 md:gap-12 pt-8 md:pt-24 px-4"
          data-reveal
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.15] md:leading-[1.1] max-w-5xl tracking-tight">
            Начните прямо сейчас
          </h1>
          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-8 md:py-10 px-10 md:px-16 rounded-2xl text-2xl md:text-xl shadow-xl transition-all hover:scale-105 active:scale-95 btn-glow w-full sm:w-auto"
          >
            <a href={APP_URL}>Начать бесплатно</a>
          </Button>
        </div>
      </div>
    </LandingLayout>
  );
}
