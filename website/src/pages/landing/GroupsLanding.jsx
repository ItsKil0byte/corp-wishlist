import HeroCentered from "@/components/landing/HeroCentered";
import StepByStep from "@/components/landing/StepByStep";

export default function GroupsLanding() {
  const APP_URL = import.meta.env.VITE_APP_URL || "https://app.corpwishlist.ru";

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24">
      <HeroCentered
        title="Как организовать выбор подарков в коллективе? Попробуйте GiftoYou!"
        buttonText="Создать группу"
        buttonLink={APP_URL}
      />

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
    </div>
  );
}
