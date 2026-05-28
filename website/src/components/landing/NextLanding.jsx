import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Section from "./shared/Section";

/**
 * Компонент внутренней перелинковки в конце лендинга.
 * @param {string} title - Заголовок блока
 * @param {string} description - Описание предложения
 * @param {string} buttonText - Текст на кнопке
 * @param {string} link - Путь для перехода
 */
export default function NextLanding({ title, description, buttonText, link }) {
  return (
    <Section spacing="large" data-reveal>
      <div className="w-full glass-strong p-10 md:p-16 rounded-[3rem] flex flex-col items-center text-center gap-8 relative overflow-hidden group">
        {/* Декоративный фон */}
        <div className="absolute inset-0 bg-linear-to-br from-main-theme/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <Button
          asChild
          className="bg-main-theme hover:bg-main-theme/90 text-gray-900 font-black py-8 px-12 rounded-2xl text-xl shadow-xl transition-all hover:scale-105 active:scale-95 btn-glow relative z-10"
        >
          <Link to={link}>{buttonText}</Link>
        </Button>
      </div>
    </Section>
  );
}
