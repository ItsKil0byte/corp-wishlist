import { Clock, CreditCard, Zap } from "lucide-react";

const steps = [
  {
    icon: <Clock className="size-6 text-main-theme" />,
    title: "30 секунд",
    description: "На создание первого списка",
  },
  {
    icon: <CreditCard className="size-6 text-main-theme" />,
    title: "0 рублей",
    description: "Бесплатный доступ ко всем функциям",
  },
  {
    icon: <Zap className="size-6 text-main-theme" />,
    title: "Универсально",
    description: "Работает в любом мессенджере по ссылке",
  },
];

/**
 * Блок "Быстрый старт" — краткие преимущества сервиса.
 */
export default function Stats() {
  return (
    <section className="w-full max-w-5xl mx-auto py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-main-theme/5 hover:border-main-theme/20 transition-all hover:-translate-y-1 shadow-sm"
          >
            <div className="size-12 rounded-xl bg-main-theme/10 flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
