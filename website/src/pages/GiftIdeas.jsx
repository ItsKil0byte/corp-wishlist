import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function GiftIdeas() {
  return (
    <>
      <SEO
        title="Идеи подарков | GiftoYou"
        description="Сборник идей для подарков от GifttoYou"
      />
      <div className="min-h-[70vh] max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="relative mb-12" data-reveal>
          <div className="size-32 bg-main-theme-lite rounded-[2.5rem] flex items-center justify-center shadow-xl rotate-3 transform group-hover:rotate-0 transition-transform duration-500">
            <Gift className="size-16 text-main-theme" />
          </div>
          <Sparkles className="absolute -top-4 -right-4 size-10 text-yellow-400 animate-pulse" />
        </div>
        
        <div className="space-y-6 max-w-3xl" data-reveal data-reveal-delay="1">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Раздел в разработке...
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
            Совсем скоро здесь появятся авторские подборки подарков на все случаи жизни! Мы усердно наполняем базу самыми крутыми идеями.
          </p>
        </div>

        <div className="mt-16" data-reveal data-reveal-delay="2">
          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-10 px-16 rounded-xl text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 btn-glow"
          >
            <Link to="/" className="flex items-center gap-3">
              <ArrowLeft className="size-6" /> Вернуться на главную
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
