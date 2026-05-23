import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ListChecks, Share2 } from "lucide-react";

export default function WishlistLanding() {
  const APP_URL = import.meta.env.VITE_APP_URL || "https://app.corpwishlist.ru";

  return (
    <>
      <SEO
        title="Создать вишлист | GiftoYou"
        description="Как создать качественный вишлист и поделиться им с друзьями, коллегами или родными? GiftoYou приходит на помощь!"
      />

      <main className="flex flex-col gap-24 pb-32 pt-16 md:pt-24">
        {/* Hero Section */}
        <section
          className="flex flex-col items-center text-center gap-12 px-4"
          data-reveal
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] max-w-5xl tracking-tight">
            Как создать качественный вишлист и поделиться им?
            <span className="gradient-text mt-4 block">
              GiftoYou спешит на помощь!
            </span>
          </h1>

          <div className="w-full max-w-6xl glass-frame !p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
            <img
              src="/mockups/create-wishlist/main.png"
              alt="Main Image"
              className="w-full h-auto rounded-[2rem]"
            />
          </div>

          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-10 px-20 rounded-2xl text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 mt-4 btn-glow"
          >
            <a href={APP_URL}>Создать вишлист</a>
          </Button>
        </section>

        {/* Feature Cards Section */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </section>

        <div className="gradient-divider" />

        {/* Content Showcase */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
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
            <div className="w-full lg:w-2/5 glass-frame !p-3 shadow-2xl">
              <img
                src="/mockups/create-wishlist/wishlists.png"
                alt="Wishlists"
                className="rounded-2xl w-full"
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
            <div className="w-full lg:w-2/5 glass-frame !p-3 shadow-2xl">
              <img
                src="/mockups/create-wishlist/modal.jpg"
                alt="Modal"
                className="rounded-2xl w-full"
              />
            </div>
          </div>
        </section>

        <div className="gradient-divider" />

        {/* Final CTA */}
        <section
          className="flex flex-col items-center text-center gap-12 px-4 py-24"
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
        </section>
      </main>
    </>
  );
}
