import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift } from "lucide-react";
import { Link } from "react-router-dom";

export default function GiftIdeas() {
  return (
    <>
      <SEO
        title="Идеи подарков"
        description="Сборник идей для подарков от GifttoYou"
      />
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="size-24 bg-main-theme-lite rounded-full flex items-center justify-center mb-8">
          <Gift className="size-12 text-main-theme" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Раздел в разработке...
        </h1>
        <p className="text-gray-600 max-w-md mb-8">
          Совсем скоро здесь появятся подборки подарков на все случаи жизни! Мы
          усердно собираем списки, нужно только немного подождать.
        </p>
        <Button
          asChild
          className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-bold py-6 px-8 rounded-lg hover:scale-105 active:hover-95"
        >
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="size-4" /> Вернуться на главную
          </Link>
        </Button>
      </div>
    </>
  );
}
