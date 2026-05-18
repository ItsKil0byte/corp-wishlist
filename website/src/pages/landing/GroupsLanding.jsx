import HeroCentered from "@/components/landing/HeroCentered";
import StepByStep from "@/components/landing/StepByStep";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export default function GroupsLanding() {
  const APP_URL = import.meta.env.VITE_APP_URL || "https://app.corpwishlist.ru";

  return (
    <>
      {/* SEO */}
      <SEO
        title="Выбор подарков в коллективе | GiftoYou"
        description="Организуйте выбор подарка в коллективе без лишних чатов и гаданий на кофейной гуще. Попробуйте GiftoYou!"
      />

      {/* Контейнер страницы */}
      <main className="flex flex-col gap-20 pb-32">
        {/* Главный экран */}
        <HeroCentered
          title="Как организовать выбор подарков в коллективе? Попробуйте GiftoYou!"
          buttonText="Создать группу"
          buttonLink={APP_URL}
        />

        {/* Блок с фичами */}
        <section className="max-w-5xl mx-auto px-4 space-y-24">
          <div className="text-center space-y-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Вместо двухчасовых гаданий на кофейной гуще — выбор подарка из
              конкретного вишлиста
            </h2>
            <img
              src="/mockups/for-groups/wishlist.png"
              alt="Wishlist"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          <div className="text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Не надо создавать 10 чатов — хватит одной группы
            </h2>
            <img
              src="/mockups/for-groups/group.png"
              alt="Group"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 bg-main-theme-lite/30 p-8 rounded-3xl">
            <div className="w-full lg:w-2/3">
              <img
                src="/mockups/for-groups/profile.png"
                alt="Profile"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="w-full lg:w-1/3 text-left">
              <h2 className="text-3xl font-bold text-gray-900">
                Каждый сможет рассказать о своих желаниях и дать интригу, чтобы
                остальные могли выбрать тот самый подарок
              </h2>
            </div>
          </div>
        </section>

        {/* Как это работает? */}
        <StepByStep
          steps={[
            {
              title: "1. Создай группу",
              image: "/mockups/for-groups/create.gif",
            },
            {
              title: "2. Делись ссылкой",
              image: "/mockups/for-groups/share.gif",
            },
            {
              title: "3. Вместе наполняйте вишлисты и профили",
              image: "/mockups/for-groups/fill.gif",
            },
            {
              title: "4. Готово! Пора бежать за подарками!",
              image: "/mockups/for-groups/gifts.png",
            },
          ]}
        />

        {/* Призыв к действию */}
        <div className="flex justify-center px-4">
          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-12 px-24 rounded-lg text-2xl shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <a href={APP_URL}>Создать группу</a>
          </Button>
        </div>
      </main>
    </>
  );
}
