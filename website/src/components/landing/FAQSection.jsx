import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "./shared/Section";
import GradientTitle from "./shared/GradientTitle";

const faqs = [
  {
    question: "Это точно бесплатно?",
    answer:
      "Да, базовый функционал создания вишлистов и групп всегда будет бесплатным.",
  },
  {
    question: "Нужна ли регистрация моим друзьям?",
    answer:
      "Нет, ваш список желаний открывается по прямой ссылке в любом браузере.",
  },
  {
    question: "Безопасны ли мои данные?",
    answer:
      "Мы используем современные протоколы шифрования и не передаем ваши данные третьим лицам.",
  },
];

/**
 * Блок вопросов и ответов (FAQ).
 */
export default function FAQSection() {
  return (
    <Section className="flex flex-col items-center gap-12" data-reveal>
      <div className="text-center">
        <GradientTitle as="h2" title="Часто задаваемые вопросы" />
        <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium">
          Все, что вы хотели знать о GiftoYou
        </p>
      </div>

      <div className="w-full max-w-3xl glass-frame p-6 md:p-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={index === faqs.length - 1 ? "border-b-0" : ""}
            >
              <AccordionTrigger className="text-base md:text-lg font-bold py-6 dark:text-gray-100">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base dark:text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
