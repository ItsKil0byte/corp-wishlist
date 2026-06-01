import { Link } from "react-router-dom";

export default function Features() {
  const cards = [
    {
      title: "Не знаете, что подарить?",
      pain: "Надоело гадать и дарить ненужные вещи? Сэкономьте время себе и вашим друзьям.",
      link: "/what-to-send",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-main-theme"
        >
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </svg>
      ),
      cta: "Найти идеи",
    },
    {
      title: "Списки желаний теряются?",
      pain: "Забудьте о разрозненных заметках в мессенджерах. Все хотелки — в одном удобном профиле.",
      link: "/create-wishlist",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
          <path d="M12 11h4" />
          <path d="M12 16h4" />
          <path d="M8 11h.01" />
          <path d="M8 16h.01" />
        </svg>
      ),
      cta: "Создать список",
    },
    {
      title: "Сложно собрать на подарок?",
      pain: "Устали от бесконечных чатов при выборе общего подарка? Организуйте всё в одной группе.",
      link: "/for-groups",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-teal-500"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      cta: "Собрать группу",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-10 md:gap-16 py-12 md:py-20">
      <div className="text-center space-y-3 md:space-y-4 px-4" data-reveal>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Знакомо? Мы это исправили
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base md:text-xl font-medium max-w-2xl mx-auto">
          GiftoYou решает вечные проблемы с выбором и организацией подарков
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-360 mx-auto px-4 md:px-12">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] glass-strong shadow-xl transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-2xl hover:border-main-theme/50 overflow-hidden"
            data-reveal
            data-reveal-delay={index + 1}
          >
            {/* Мягкий градиентный фон */}
            <div
              className={`absolute inset-0 bg-linear-to-tl ${card.link === "/what-to-send" ? "from-main-theme/10" : card.link === "/create-wishlist" ? "from-blue-400/10" : "from-teal-400/10"} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
            />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="size-16 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-gray-100 leading-tight group-hover:text-main-theme transition-colors">
                  {card.title}
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-medium mb-8 md:mb-10">
                {card.pain}
              </p>

              <div className="mt-auto flex items-center text-main-theme font-black text-sm md:text-base uppercase tracking-widest gap-2 md:gap-3">
                <span className="relative">
                  {card.cta}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-main-theme transition-all duration-500 group-hover:w-full" />
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 md:size-5 transform group-hover:translate-x-2 transition-transform duration-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
