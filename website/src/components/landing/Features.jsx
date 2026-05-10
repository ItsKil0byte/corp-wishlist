import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Features() {
  const appUrl = import.meta.env.VITE_APP_URL || "localhost:3000";

  const pains = [
    {
      title: "Не знает, как поделиться своими желаниями",
      background: "bg-main-theme",
      border: "border-main-theme",
      points: [
        "Надоело собирать желания по разным углам",
        "Сообщение со списком всё время теряется в груде сообщений",
        "Толком не прикрепить ни ссылку, ни картинку",
      ],
    },
    {
      title: "Не знает, что подарить",
      background: "bg-main-theme",
      border: "border-main-theme",
      points: [
        "«Не знаю, ничего не надо, хочу проверить, насколько хорошо ты меня знаешь» — аааааа",
        "Опять дарить деньги",
        "Надоело каждый раз играть в шпиона, цепляясь за подсказки в соц. сетях, воспоминаниях годовой давности и советах общих знакомых",
        "Потратил кучу времени и выбрал классную вещь, но прогадал с цветом или размером",
      ],
    },
    {
      title: "Не знает, как организовать выбор подарка в группах",
      background: "bg-main-theme",
      border: "border-main-theme",
      points: [
        "Выматывают двухчасовые переговоры с выхлопом в виде подарочного сертификата на Ozon",
        "Устал от бесконечно создаваемых под каждый День Рождения или 8 марта чатов",
        "«Ну всех же не спросишь»",
      ],
    },
  ];

  return (
    <section className="flex flex-col items-center gap-12 mt-16 md:mt-24">
      <h2 className="text-3xl md:text-[2.5rem] text-gray-900 font-bold text-center leading-tight">
        GiftoYou идеален для тех, кто:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-start">
        {pains.map((column, index) => (
          <div key={index} className="f;ex f;ex-col items-center gap-6">
            <div
              className={`w-full ${column.background} border-2 ${column.border} rounded-lg p-6 text-center shadow-sm hover:-translate-y-1 transition-transform min-h-27.5 flex items-center justify-center`}
            >
              <h3 className="font-bold text-gray-900 text-lg leading-snug">
                {column.title}
              </h3>
            </div>

            <ul className="flex flex-col gap-5 px-2 w-full mt-8">
              {column.points.map((point, i) => (
                <li
                  key={i}
                  className="text-gray-900 text-[0.9375rem] md:text-base leading-relaxed text-center"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Button
          asChild
          className="bg-main-theme-lite hover:bg-main-theme-lite/70 text-gray-900 border-2 border-main-theme/40 font-bold py-8 px-12 rounded-lg text-lg shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <a href={appUrl}>Сделать выбор подарка идеальным</a>
        </Button>
      </div>
    </section>
  );
}
