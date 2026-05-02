import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const features = [
  {
    icon: "🏠",
    title: "Создавайте группы",
    description:
      "Создавайте группы для своей команды. Её участники смогут видеть вишлисты друг друга, обмениваться идеями и вместе готовиться к праздникам.",
  },
  {
    icon: "🔗",
    title: "Делитесь вишлистами",
    description:
      "Делитесь своими вишлистами с другими коллегами. Они откроют их в один клик, без регистрации и лишних паролей. Просто отправьте им ссылку!",
  },
  {
    icon: "⏰",
    title: "Экономьте время",
    description:
      "Забудьте о бесконечных обсуждениях в чатах и мучительном выборе подарков. С нашим вишлистом всё просто: вы видите, что хотят ваши коллеги, и выбираете подарок, который точно понравится.",
  },
];

export default function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="group p-6 hover:-translate-y-1 transition-all"
        >
          <CardHeader>
            <div className="text-3xl mb-2">{feature.icon}</div>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 leading-relaxed mb-4">
            {feature.description}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
