import { User } from "lucide-react";
import Section from "./shared/Section";
import GradientTitle from "./shared/GradientTitle";

const reviews = [
  {
    text: "Раньше мы неделю гадали, что купить коллеге, и всё равно дарили ерунду. С GiftoYou выбор занимает пару минут.",
    author: "Артем",
    role: "разработчик",
    initial: "А",
    color: "bg-blue-100 text-blue-600",
  },
  {
    text: "Больше не нужно неловко отвечать «да мне ничего не надо». Просто кидаю ссылку на свой вишлист.",
    author: "Марина",
    role: "HR-менеджер",
    initial: "М",
    color: "bg-main-theme/10 text-main-theme",
  },
];

/**
 * Блок отзывов пользователей
 */
export default function Reviews() {
  return (
    <Section className="flex flex-col items-center gap-12 md:gap-16" data-reveal>
      <div className="text-center space-y-4">
        <GradientTitle as="h2" size="large" title="Что говорят пользователи" />
        <p className="text-gray-500 text-lg font-medium">
          Помогаем дарить радость и экономить время
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto px-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="glass-strong p-8 md:p-10 rounded-[2rem] flex flex-col gap-6 relative group hover:-translate-y-2 transition-all duration-500"
          >
            <div className="text-main-theme opacity-20 absolute top-8 right-8">
              <svg
                width="40"
                height="30"
                viewBox="0 0 40 30"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.4286 0L17.1429 5.71429V17.1429C17.1429 24.2857 11.4286 30 4.28571 30H0V24.2857H4.28571C8.57143 24.2857 11.4286 21.4286 11.4286 17.1429V0ZM34.2857 0L40 5.71429V17.1429C40 24.2857 34.2857 30 27.1429 30H22.8571V24.2857H27.1429C31.4286 24.2857 34.2857 21.4286 34.2857 17.1429V0Z" />
              </svg>
            </div>

            <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed italic relative z-10">
              «{review.text}»
            </p>

            <div className="flex items-center gap-4 mt-auto">
              <div className={`size-12 rounded-full flex items-center justify-center font-bold text-lg ${review.color}`}>
                {review.initial}
              </div>
              <div>
                <h4 className="font-black text-gray-900">{review.author}</h4>
                <p className="text-gray-500 text-sm font-medium">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
