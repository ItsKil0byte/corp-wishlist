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
      "Да, базовый функционал создания вишлистов и групп всегда будет бесплатным. Мы планируем зарабатывать на дополнительных сервисах для брендов, а не на пользователях.",
  },
  {
    question: "Нужна ли регистрация моим друзьям?",
    answer:
      "Нет! В этом и прелесть. Вы просто отправляете ссылку, и любой человек может просмотреть ваш список без создания аккаунта и ввода паролей.",
  },
  {
    question: "Безопасны ли мои данные?",
    answer:
      "Мы используем современные протоколы шифрования и не передаем ваши личные данные третьим лицам. Ваш список желаний доступен только тем, кому вы дали ссылку.",
  },
];

export default function FAQSection() {
  return (
    <Section
      spacing="large"
      className="flex flex-col items-center gap-16"
      data-reveal
    >
      <div className="text-center">
        <GradientTitle as="h2" title="Остались вопросы?" />
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg font-medium">
          Все, что вы хотели знать о GiftoYou в одном месте
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-strong border-transparent dark:border-white/5 px-2 md:px-4"
            >
              <AccordionTrigger className="text-base md:text-xl font-bold py-6 text-gray-900 dark:text-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
