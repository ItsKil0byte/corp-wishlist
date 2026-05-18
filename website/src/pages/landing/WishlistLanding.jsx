import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

export default function WishlistLanding() {
  const APP_URL = import.meta.env.VITE_APP_URL || "https://app.corpwishlist.ru";

  return (
    <>
      {/* SEO */}
      <SEO
        title="Создать вишлист | GiftoYou"
        description="Как создать качественный вишлист и поделиться им с друзьями, коллегами или родными? GiftoYou приходит на помощь!"
      />

      {/* Контейнер страницы */}
      <main className="flex flex-col gap-20 pb-32">
        {/* Главный экран */}
        <section className="flex flex-col items-center text-center gap-10 pt-12 md:pt-16 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight max-w-5xl">
            Как создать качественный вишлист и поделиться им с друзьями,
            коллегами или родными?
            <br />
            <span className="text-main-theme mt-2 block">
              GiftoYou приходит на помощь!
            </span>
          </h1>

          <div className="w-full max-w-5xl">
            <img
              src="/mockups/create-wishlist/main.png"
              alt="Main Image"
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>

          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-8 px-16 rounded-lg text-xl shadow-sm transition-all hover:scale-105 active:scale-95 mt-4"
          >
            <a href={APP_URL}>Создать вишлист</a>
          </Button>
        </section>

        {/* Блок: Никаких заметок */}
        <section className="max-w-5xl mx-auto px-4 text-center space-y-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Никаких заметок, разбросанных по углам — теперь всё в одном месте
          </h2>
          <div className="flex flex-col gap-8">
            <img
              src="/mockups/create-wishlist/wishlists.png"
              alt="Wishlists"
              className="rounded-lg shadow-lg w-full"
            />
            <img
              src="/mockups/create-wishlist/wishlist.png"
              alt="Wishlist"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </section>

        {/* Блок: Просто заполни форму */}
        <section className="max-w-5xl mx-auto px-4 text-center space-y-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 max-w-3xl mx-auto">
            Просто заполни понравившиеся поля, форма уже продумана для
            идеального описания подарка
          </h2>
          <div className="flex justify-center">
            <img
              src="/mockups/create-wishlist/modal.jpg"
              alt="Modal"
              className="rounded-lg shadow-xl max-w-md w-full"
            />
          </div>
        </section>

        {/* Призыв к действию */}
        <section className="flex flex-col items-center text-center gap-12 px-4 mt-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 max-w-5xl leading-tight">
            Без рекламы, без платных подписок,
            <br />
            только простор для желанных подарков!
          </h2>

          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-12 px-16 md:px-24 rounded-lg text-2xl shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <a href={APP_URL}>Создать идеальный вишлист</a>
          </Button>
        </section>
      </main>
    </>
  );
}
