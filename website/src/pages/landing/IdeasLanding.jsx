import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Copy, Gift, MousePointer2, Share2, Info } from "lucide-react";
import Section from "@/components/landing/shared/Section";
import AppImage from "@/components/landing/shared/AppImage";
import GradientTitle from "@/components/landing/shared/GradientTitle";

export default function IdeasLanding() {
  const APP_URL = import.meta.env.VITE_APP_URL || "https://app.corpwishlist.ru";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Ссылка скопирована!", {
      style: {
        borderRadius: "12px",
        background: "#333",
        color: "#fff",
        fontWeight: "bold"
      },
    });
  };

  return (
    <>
      <SEO
        title="Что подарить? Идеи подарков | GiftoYou"
        description="Праздник близится, а что дарить — непонятно? GiftoYou спешит на помощь!"
      />

      <main>
        {/* Hero Section */}
        <Section spacing="large" className="text-center">
          <GradientTitle
            as="h1"
            size="hero"
            title="Праздник близится, а что дарить — непонятно?"
            gradientPart="GiftoYou спешит на помощь!"
          />
        </Section>

        {/* Feature Highlights */}
        <Section spacing="medium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Gift className="size-8 text-main-theme" />, title: "Никаких гаданий", desc: "Узнайте точно, что порадует близкого человека" },
              { icon: <MousePointer2 className="size-8 text-blue-500" />, title: "Один клик", desc: "Все хотелки собраны в удобном списке" },
              { icon: <Share2 className="size-8 text-teal-500" />, title: "Легко делиться", desc: "Отправьте ссылку и забудьте о проблемах" }
            ].map((item, i) => (
              <div key={i} className="glass-strong p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-6 hover:-translate-y-2 transition-all duration-500 shadow-xl" data-reveal data-reveal-delay={i}>
                <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner">{item.icon}</div>
                <h3 className="text-2xl font-black text-gray-900">{item.title}</h3>
                <p className="text-gray-500 font-medium text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Interactive Pain Collage */}
        <Section spacing="medium" className="space-y-12" data-reveal>
          <div className="text-center space-y-4">
             <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Можно выбирать подарки «по старинке»...</h2>
             <p className="text-gray-500 text-lg font-medium">Наведите на элементы, чтобы вспомнить эту боль</p>
          </div>

          <div className="relative w-full aspect-square md:aspect-[21/9] glass-strong rounded-[3rem] overflow-hidden shadow-2xl border-white/20 group/collage">
             <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />
            
            {/* Image 1: Chat */}
            <div className="absolute top-[10%] left-[5%] w-[45%] md:w-[28%] -rotate-6 shadow-2xl rounded-2xl z-20 hover:rotate-0 hover:scale-110 transition-all duration-500 group/item1 cursor-help">
               <img src="/mockups/what-to-send/chat.png" alt="Chat" className="rounded-2xl border border-white/10" />
               <div className="absolute -bottom-6 -right-6 bg-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-100 opacity-0 group-hover/item1:opacity-100 transition-all duration-300 font-black text-sm text-gray-900 whitespace-nowrap z-50 transform translate-y-2 group-hover/item1:translate-y-0 flex items-center gap-2">
                  <span className="text-xl">🤯</span> Сотни сообщений в чатах
               </div>
            </div>

            {/* Image 2: Gift */}
            <div className="absolute bottom-[10%] left-[15%] md:left-[35%] w-[40%] md:w-[25%] rotate-3 shadow-2xl rounded-2xl z-30 hover:rotate-0 hover:scale-110 transition-all duration-500 group/item2 cursor-help">
               <img src="/mockups/what-to-send/gift.jpg" alt="Gift" className="rounded-2xl border border-white/10" />
               <div className="absolute -top-6 -left-6 bg-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-100 opacity-0 group-hover/item2:opacity-100 transition-all duration-300 font-black text-sm text-gray-900 whitespace-nowrap z-50 transform translate-y-2 group-hover/item2:translate-y-0 flex items-center gap-2">
                  <span className="text-xl">👕</span> Опять не тот размер...
               </div>
            </div>

            {/* Image 3: Detective */}
            <div className="absolute top-[15%] md:top-[10%] right-[5%] w-[50%] md:w-[32%] rotate-2 shadow-2xl rounded-2xl z-20 hover:rotate-0 hover:scale-110 transition-all duration-500 group/item3 cursor-help">
               <img src="/mockups/what-to-send/detective.png" alt="Detective" className="rounded-2xl border border-white/10" />
               <div className="absolute -bottom-6 -left-6 bg-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-100 opacity-0 group-hover/item3:opacity-100 transition-all duration-300 font-black text-sm text-gray-900 whitespace-nowrap z-50 transform translate-y-2 group-hover/item3:translate-y-0 flex items-center gap-2">
                  <span className="text-xl">🕵️‍♂️</span> Слежка в соцсетях
               </div>
            </div>

            {/* Helper Badge */}
            <div className="absolute bottom-8 right-8 flex items-center gap-2 text-gray-400 font-bold text-sm animate-bounce">
               <Info className="size-4" /> Наведите на фото
            </div>
          </div>
        </Section>

        <div className="gradient-divider" />

        {/* GiftoYou Solution Section */}
        <Section spacing="large" className="space-y-32">
          <GradientTitle
             title="А можно просто отправить ссылку 🚀"
             subtitle="GiftoYou делает выбор подарка праздником, а не стрессом"
             className="text-center"
          />

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24" data-reveal>
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Избавьтесь от головоломки
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Забудьте о роли детектива. Получите четкий список желаний, где каждая позиция — именно то, что нужно. Ссылки, фото и описание уже внутри.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
               <AppImage src="/mockups/what-to-send/app-demo.gif" alt="App Demo" />
            </div>
          </div>
        </Section>

        {/* Final CTA */}
        <Section
          spacing="medium"
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="border-2 border-main-theme/20 text-gray-900 font-black py-10 px-10 rounded-2xl text-xl shadow-xl transition-all hover:bg-main-theme/10 active:scale-95 w-full sm:w-auto flex items-center justify-center gap-3"
          >
            <Copy className="size-6" /> Скопировать ссылку
          </Button>

          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-10 px-16 rounded-2xl text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto btn-glow flex items-center justify-center"
          >
            <a href={APP_URL}>Создать вишлист</a>
          </Button>
        </Section>
      </main>
    </>
  );
}
