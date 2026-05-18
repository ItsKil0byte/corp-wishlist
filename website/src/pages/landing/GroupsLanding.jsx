import HeroCentered from "@/components/landing/HeroCentered";

export default function GroupsLanding() {
  const APP_URL = import.meta.env.VITE_APP_URL || "https://app.corpwishlist.ru";

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24">
      <HeroCentered
        title="Как организовать выбор подарков в коллективе? Попробуйте GiftoYou!"
        buttonText="Создать группу"
        buttonLink={APP_URL}
      />
    </div>
  );
}
