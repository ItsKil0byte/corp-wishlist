import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function IdeasLanding() {
  const APP_URL = import.meta.env.VITE_APP_URL || "https://app.corpwishlist.ru";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Ссылка скопирована в буфер обмена!", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <>
      {/* SEO */}
      <SEO
        title="Что подарить? Идеи подарков | GiftoYou"
        description="Праздник близится, а что дарить — непонятно? GiftoYou спешит на помощь!"
      />

      {/* Тост */}
      <Toaster />

      {/* Контейнер страницы */}
      <main className="flex flex-col gap-24 pb-32 pt-12 md:pt-16">
        {/* Заголовок */}
        <header className="text-center px-4">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight max-w-4xl mx-auto">
            Праздник близится, а что дарить — непонятно?
            <br />
            <span className="text-main-theme">GiftoYou спешит на помощь!</span>
          </h1>
        </header>

        {/* Коллаж */}
        <section className="w-full max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Можно выбирать подарок так
          </h2>

          <div className="relative w-full aspect-square md:aspect-21/9 bg-main-theme-lite/20 rounded-3xl overflow-hidden shadow-inner border border-main-theme/10">
            <img
              src="/mockups/what-to-send/chat.png"
              alt="Chat"
              className="absolute top-[10%] left-[5%] w-[45%] md:w-[35%] -rotate-6 shadow-xl rounded-xl z-20 hover:rotate-0 hover:scale-105 transition-transform duration-300"
            />

            <img
              src="/mockups/what-to-send/gift.jpg"
              alt="Gift"
              className="absolute bottom-[5%] left-[15%] md:left-[25%] w-[40%] md:w-[30%] rotate-3 shadow-2xl rounded-xl z-30 hover:rotate-0 hover:scale-105 transition-transform duration-300"
            />

            <img
              src="/mockups/what-to-send/detective.png"
              alt="Detective"
              className="absolute top-[20%] md:top-[15%] right-[5%] w-[50%] md:w-[40%] rotate-2 shadow-xl rounded-xl z-20 hover:rotate-0 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </section>

        {/* Блок с демонстрацией */}
        <section className="w-full max-w-4xl mx-auto px-4 text-center space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            А можно просто скинуть ссылку на классный сервис
            <br />
            по созданию вишлистов
          </h2>
          <div className="w-full aspect-video bg-gray-100 rounded-2xl border-2 border-gray-200 shadow-lg flex items-center justify-center overflow-hidden relative">
            <img
              src="/mockups/what-to-send/app-demo.gif"
              alt="Demonstration"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Текстовые блоки */}
        <section className="w-full max-w-4xl mx-auto px-4 space-y-16 mt-8">
          <div className="flex justify-start">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 max-w-2xl text-left leading-tight">
              Ты избавляешься от головоломки и точно знаешь, что дарить
            </h2>
          </div>
          <div className="flex justify-end">
            <h2 className="text-xl md:text-3xl font-bold text-gray-600 max-w-2xl text-right leading-tight">
              Друг легко и быстро оформляет все свои хотелки в список, которым
              делится в один клик
            </h2>
          </div>
        </section>

        {/* Призыв к действию */}
        <section className="flex flex-col sm:flex-row items-center justify-center gap-6 px-4">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="border-2 border-main-theme text-gray-900 font-bold py-8 px-8 rounded-lg text-lg shadow-sm transition-all hover:bg-main-theme/10 active:scale-95 w-full sm:w-auto"
          >
            Скопировать ссылку на лендинг
          </Button>

          <Button
            asChild
            className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-8 px-12 rounded-lg text-lg shadow-sm transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <a href={APP_URL}>Создать вишлист</a>
          </Button>
        </section>
      </main>
    </>
  );
}
