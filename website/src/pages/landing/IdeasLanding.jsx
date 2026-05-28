import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import Section from "@/components/landing/shared/Section";
import AppImage from "@/components/landing/shared/AppImage";
import GradientTitle from "@/components/landing/shared/GradientTitle";
import { APP_URL } from "@/lib/constants";
import PainCollage from "@/components/landing/PainCollage";
import { Gift, MousePointer2, Share2 } from "lucide-react";

/**
 * Страница с идеями подарков
 */
export default function IdeasLanding() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Ссылка скопирована!", {
      style: {
        borderRadius: "12px",
        background: "#333",
        color: "#fff",
        fontWeight: "bold",
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
        {/* Главный блок */}
        <Section spacing="large" className="text-center">
          <GradientTitle
            as="h1"
            size="hero"
            title="Праздник близится, а что дарить — непонятно?"
            gradientPart="GiftoYou спешит на помощь!"
          />
        </Section>

        {/* Основные преимущества */}
        <Section spacing="medium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gift className="size-8 text-main-theme" />,
                title: "Никаких гаданий",
                desc: "Узнайте точно, что порадует близкого человека",
              },
              {
                icon: <MousePointer2 className="size-8 text-blue-500" />,
                title: "Один клик",
                desc: "Все хотелки собраны в удобном списке",
              },
              {
                icon: <Share2 className="size-8 text-teal-500" />,
                title: "Легко делиться",
                desc: "Отправьте ссылку и забудьте о проблемах",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-strong p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-6 hover:-translate-y-2 transition-all duration-500 shadow-xl"
                data-reveal
                data-reveal-delay={i}
              >
                <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-500 font-medium text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Интерактивный коллаж проблем */}
        <Section spacing="medium" className="space-y-12" data-reveal>
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              Можно выбирать подарки «по старинке»...
            </h2>
          </div>

          <PainCollage />
        </Section>

        <div className="gradient-divider" />

        {/* Решение от GiftoYou */}
        <Section spacing="large" className="space-y-32">
          <GradientTitle
            title="А можно просто отправить ссылку 🚀"
            subtitle="GiftoYou делает выбор подарка праздником, а не стрессом"
            className="text-center"
          />

          <div
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
            data-reveal
          >
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Избавьтесь от головоломки
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Забудьте о роли детектива. Получите четкий список желаний, где
                каждая позиция — именно то, что нужно. Ссылки, фото и описание
                уже внутри.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <AppImage
                src="/mockups/what-to-send/app-demo.gif"
                alt="App Demo"
              />
            </div>
          </div>
        </Section>

        {/* Финальный призыв к действию */}
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
