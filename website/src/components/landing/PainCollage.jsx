import { Info } from "lucide-react";

/**
 * Компонент интерактивного коллажа с "болями" пользователя при выборе подарка
 */
export default function PainCollage() {
  return (
    <div className="relative w-full aspect-square md:aspect-21/9 glass-strong rounded-[3rem] overflow-hidden shadow-2xl border-white/20 group/collage">
      <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-transparent" />

      {/* Изображение 1: Чат */}
      <div className="absolute top-[10%] left-[5%] w-[45%] md:w-[28%] -rotate-6 shadow-2xl rounded-2xl z-20 hover:rotate-0 hover:scale-110 transition-all duration-500 group/item1 cursor-help">
        <img
          src="/mockups/what-to-send/chat.png"
          alt="Chat"
          className="rounded-2xl border border-white/10"
        />
        <div className="absolute -bottom-6 -right-6 bg-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-100 opacity-0 group-hover/item1:opacity-100 transition-all duration-300 font-black text-sm text-gray-900 whitespace-nowrap z-50 transform translate-y-2 group-hover/item1:translate-y-0 flex items-center gap-2">
          <span className="text-xl">🤯</span> Сотни сообщений в чатах
        </div>
      </div>

      {/* Изображение 2: Подарок */}
      <div className="absolute bottom-[10%] left-[15%] md:left-[35%] w-[40%] md:w-[25%] rotate-3 shadow-2xl rounded-2xl z-30 hover:rotate-0 hover:scale-110 transition-all duration-500 group/item2 cursor-help">
        <img
          src="/mockups/what-to-send/gift.jpg"
          alt="Gift"
          className="rounded-2xl border border-white/10"
        />
        <div className="absolute -top-6 -left-6 bg-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-100 opacity-0 group-hover/item2:opacity-100 transition-all duration-300 font-black text-sm text-gray-900 whitespace-nowrap z-50 transform translate-y-2 group-hover/item2:translate-y-0 flex items-center gap-2">
          <span className="text-xl">👕</span> Опять не тот размер...
        </div>
      </div>

      {/* Изображение 3: Имитация чата (Бесконечный чат) */}
      <div className="absolute top-[15%] md:top-[10%] right-[5%] w-[50%] md:w-[32%] rotate-2 shadow-2xl rounded-2xl z-20 hover:rotate-0 hover:scale-110 transition-all duration-500 group/item3 cursor-help">
        <div className="bg-[#F2F2F7] rounded-2xl border border-white/10 p-4 md:p-6 flex flex-col gap-3 md:gap-4 overflow-hidden h-full min-h-[180px] md:min-h-[240px]">
          {/* Сообщения */}
          <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm self-start max-w-[90%] text-xs md:text-sm font-medium text-gray-800">
            А что подарим?
          </div>
          <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm self-start max-w-[90%] text-xs md:text-sm font-medium text-gray-800 delay-75">
            Может сертификат?
          </div>
          <div className="bg-gray-300 p-3 rounded-2xl rounded-br-none shadow-sm self-end max-w-[90%] text-xs md:text-sm font-medium text-gray-900 delay-150">
            У него уже есть кружка...
          </div>
          <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm self-start max-w-[90%] text-xs md:text-sm font-medium text-gray-800 delay-300">
            Скиньте номер карты
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-100 opacity-0 group-hover/item3:opacity-100 transition-all duration-300 font-black text-sm text-gray-900 whitespace-nowrap z-50 transform translate-y-2 group-hover/item3:translate-y-0 flex items-center gap-2">
          <span className="text-xl">💬</span> Бесконечный хаос в чатах
        </div>
      </div>

      {/* Подсказка */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 text-gray-400 font-bold text-sm animate-bounce">
        <Info className="size-4" /> Наведите на фото
      </div>
    </div>
  );
}
