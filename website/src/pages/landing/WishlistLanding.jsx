import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";
import { CheckCircle2, ListChecks, Share2 } from "lucide-react";
import Section from "@/components/landing/shared/Section";
import GradientTitle from "@/components/landing/shared/GradientTitle";
import AppImage from "@/components/landing/shared/AppImage";

/**
 * Страница создания вишлиста
 */
export default function WishlistLanding() {
  return (
    <>
      <SEO
        title="Создать вишлист | GiftoYou"
        description="Как создать качественный вишлист и поделиться им с друзьями, коллегами или родными? GiftoYou приходит на помощь!"
      />

      <main className="pb-32">
        {/* Главный блок */}
        <Section spacing="large" className="text-center space-y-12" data-reveal>
          <GradientTitle
            as="h1"
            size="hero"
            title="Как создать качественный вишлист и поделиться им?"
            gradientPart="GiftoYou спешит на помощь!"
          />

          <AppImage
            src="/mockups/create-wishlist/main.png"
            alt="Main Image"
            className="w-full max-w-6xl mx-auto"
          />

          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-10 px-20 rounded-2xl text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 btn-glow"
          >
            <a href={APP_URL}>Создать вишлист</a>
          </Button>
        </Section>

        {/* Карточки преимуществ */}
        <Section
          spacing="medium"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <ListChecks className="size-16 text-main-theme" />,
              title: "Всё в одном месте",
              desc: "Забудьте о заметках в разных приложениях",
            },
            {
              icon: <CheckCircle2 className="size-16 text-blue-500" />,
              title: "Идеальная форма",
              desc: "Уже продумали всё за вас для описания подарка",
            },
            {
              icon: <Share2 className="size-16 text-teal-500" />,
              title: "Один клик",
              desc: "Делитесь ссылкой в любом мессенджере",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-strong p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-6 hover:-translate-y-2 transition-all duration-500 shadow-xl"
              data-reveal
              data-reveal-delay={i}
            >
              <div className="size-16 rounded-2xl flex items-center justify-center">
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
        </Section>

        <div className="gradient-divider" />

        {/* Демонстрация контента */}
        <Section spacing="large" className="space-y-32">
          <div
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
            data-reveal
          >
            <div className="w-full lg:w-3/5 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Прощайте, заметки!
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Никаких больше списков в Телеграме, которые теряются через день.
                Теперь все ваши желания структурированы и всегда под рукой.
              </p>
            </div>
            <div className="w-full lg:w-2/5">
              <AppImage
                src="/mockups/create-wishlist/wishlists.png"
                alt="Wishlists"
              />
            </div>
          </div>

          <div
            className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24"
            data-reveal
          >
            <div className="w-full lg:w-3/5 space-y-8 lg:text-right">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Удобная форма
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed lg:ml-auto lg:max-w-xl">
                Мы продумали каждое поле: добавьте ссылку, фото и описание,
                чтобы друзья точно знали, какую модель или цвет вы хотите.
              </p>
            </div>
            <div className="w-full lg:w-2/5">
              <AppImage src="/mockups/create-wishlist/modal.jpg" alt="Modal" />
            </div>
          </div>
        </Section>

        <div className="gradient-divider" />

        {/* Финальный призыв к действию */}
        <Section
          spacing="large"
          className="flex flex-col items-center text-center gap-12"
          data-reveal
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 max-w-5xl leading-tight tracking-tight">
            Без рекламы, без платных подписок.
            <br />
            <span className="text-main-theme">Только ваши желания.</span>
          </h2>
          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-12 px-24 rounded-[2rem] text-3xl shadow-2xl transition-all hover:scale-105 active:scale-95 btn-glow"
          >
            <a href={APP_URL}>Создать идеальный вишлист</a>
          </Button>
        </Section>
      </main>
    </>
  );
}
