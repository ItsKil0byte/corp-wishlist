import { Info } from "lucide-react";

/**
 * Компонент интерактивного коллажа с "болями" пользователя при выборе подарка
 */
export default function PainCollage() {
  return (
    <div className="relative w-full max-w-6xl mx-auto aspect-[4/5] md:aspect-[21/9] glass-strong rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-white/20 group/collage">
      {/* Мягкий градиентный фон */}
      <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-transparent" />

      {/* Блок 1: Свитер (Визуализация боли) */}
      <div className="absolute top-[8%] left-[5%] md:top-[10%] md:left-[10%] w-[75%] md:w-[30%] -rotate-3 md:-rotate-6 shadow-2xl rounded-2xl z-30 hover:rotate-0 hover:scale-110 transition-all duration-500 group/item1 cursor-help">
        <img
          src="/mockups/what-to-send/not-this.png"
          alt="Неудачный подарок"
          className="rounded-2xl border border-white/10 w-full"
        />
        {/* Всплывающая подпись */}
        <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-white dark:bg-gray-800 px-4 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 group-hover/item1:opacity-100 transition-all duration-300 font-black text-xs md:text-sm text-gray-900 dark:text-white whitespace-nowrap z-50 transform translate-y-2 group-hover/item1:translate-y-0 flex items-center gap-2">
          <span className="text-lg md:text-xl">🙄</span> Опять подарил ерунду...
        </div>
      </div>

      {/* Блок 2: Имитация чата (Хаос обсуждений) */}
      <div className="absolute bottom-[10%] right-[5%] md:top-[15%] md:right-[10%] w-[85%] md:w-[32%] rotate-2 md:rotate-3 shadow-2xl rounded-3xl z-20 hover:rotate-0 hover:scale-105 transition-all duration-500 group/item2 cursor-help">
        <div className="bg-[#F2F2F7] dark:bg-gray-900/90 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/5 p-5 md:p-7 flex flex-col gap-3 md:gap-4 overflow-hidden h-full">
          {/* Пузыри сообщений */}
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm self-start max-w-[90%] text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-200">
            А что подарим?
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm self-start max-w-[90%] text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-200">
            Может сертификат?
          </div>
          <div className="bg-main-theme/10 dark:bg-main-theme/20 p-3 rounded-2xl rounded-br-none shadow-sm self-end max-w-[90%] text-xs md:text-sm font-bold text-main-theme">
            У него уже есть пять кружек...
          </div>
          <div className="hidden md:block bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm self-start max-w-[90%] text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-200">
            Скиньте номер карты!
          </div>
        </div>

        {/* Всплывающая подпись чата */}
        <div className="absolute -top-8 -left-2 md:-left-10 bg-white dark:bg-gray-800 px-4 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 group-hover/item2:opacity-100 transition-all duration-300 font-black text-xs md:text-sm text-gray-900 dark:text-white whitespace-nowrap z-50 transform translate-y-2 group-hover/item2:translate-y-0 flex items-center gap-2">
          <span className="text-lg md:text-xl">💬</span> Бесконечный хаос в
          чатах
        </div>
      </div>

      {/* Индикатор взаимодействия */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-2 text-gray-400 dark:text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-widest animate-pulse">
        <Info className="size-3 md:size-4" /> Наведите на элементы
      </div>
    </div>
  );
}
