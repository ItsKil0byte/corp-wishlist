import HeroCentered from "@/components/landing/HeroCentered";
import StepByStep from "@/components/landing/StepByStep";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { APP_URL } from "@/lib/constants";
import { Users, Layout, Heart } from "lucide-react";

export default function GroupsLanding() {
  return (
    <>
      <SEO
        title="Выбор подарков в коллективе | GiftoYou"
        description="Организуйте выбор подарка в коллективе без лишних чатов и гаданий на кофейной гуще. Попробуйте GiftoYou!"
      />

      <main className="flex flex-col gap-24 pb-32">
        <HeroCentered
          title="Как организовать выбор подарков в коллективе?"
          subtitle=" GiftoYou помогает командам находить идеальные подарки без бесконечных обсуждений."
          buttonText="Создать группу"
          buttonLink={APP_URL}
        />

        {/* Основные преимущества */}
        <section className="max-w-360 mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="size-16 text-main-theme" />,
              title: "Одна группа",
              desc: "Вместо десятка чатов под каждый повод",
            },
            {
              icon: <Layout className="size-16 text-blue-500" />,
              title: "Вишлисты",
              desc: "Подарки выбираются из реальных желаний",
            },
            {
              icon: <Heart className="size-16 text-teal-500" />,
              title: "Интрига",
              desc: "Получатель не узнает, кто и что выбрал",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-strong p-8 rounded-[2rem] flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-all duration-500 shadow-xl"
              data-reveal
              data-reveal-delay={i}
            >
              <div className="size-16 rounded-2xl flex items-center justify-center mb-2">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        <div className="gradient-divider" />

        {/* Визуальные блоки контента */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
          <div
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
            data-reveal
          >
            <div className="w-full lg:w-3/5 glass-frame !p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] hover:shadow-main-theme/10 transition-shadow duration-700">
              <img
                src="/mockups/for-groups/wishlist.png"
                alt="Wishlist"
                className="rounded-2xl w-full"
              />
            </div>
            <div className="w-full lg:w-2/5 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Выбор из реального вишлиста
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Больше никаких гаданий. Вы точно знаете, что хочет человек, и
                выбираете подарок из его личного списка желаний.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24"
            data-reveal
          >
            <div className="w-full lg:w-3/5 glass-frame !p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] hover:shadow-blue-400/10 transition-shadow duration-700">
              <img
                src="/mockups/for-groups/group.png"
                alt="Group"
                className="rounded-2xl w-full"
              />
            </div>
            <div className="w-full lg:w-2/5 space-y-6 lg:text-right">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Вся команда в одном месте
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Создайте одну группу для вашего отдела или друзей. Управляйте
                событиями и списками без лишнего шума.
              </p>
            </div>
          </div>
        </section>

        <div className="gradient-divider" />

        <StepByStep
          steps={[
            {
              title: "Создай группу",
              description:
                "Это займет меньше минуты. Просто придумай название и цель сбора.",
              image: "/mockups/for-groups/create.gif",
            },
            {
              title: "Делись ссылкой",
              description:
                "Отправь приглашение коллегам или друзьям в любой мессенджер.",
              image: "/mockups/for-groups/share.gif",
            },
            {
              title: "Наполняйте вишлисты",
              description:
                "Пусть каждый расскажет о своих мечтах, чтобы подарки всегда были в радость.",
              image: "/mockups/for-groups/fill.gif",
            },
            {
              title: "Дарите с удовольствием!",
              description:
                "Готово! Теперь выбор подарка стал простым и приятным процессом.",
              image: "/mockups/for-groups/gifts.png",
            },
          ]}
        />

        <div className="flex justify-center px-4" data-reveal>
          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-12 px-24 rounded-2xl text-3xl shadow-2xl transition-all hover:scale-105 active:scale-95 btn-glow"
          >
            <a href={APP_URL}>Создать группу</a>
          </Button>
        </div>
      </main>
    </>
  );
}
