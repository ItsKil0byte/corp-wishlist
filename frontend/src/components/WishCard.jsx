import { Card } from "@/components/ui/card";
import { getBorderColor, getContrastColor } from "@/lib/utils";

export default function WishCard({ title, description, color, onClick }) {
  const contrastColor = getContrastColor(color);
  const borderColor = getBorderColor(color);

  // TODO: Переписать на использование компонентов из UI библиотеки

  return (
    <Card
      onClick={onClick}
      style={{
        backgroundColor: color,
        borderColor: borderColor,
      }}
      className={`flex flex-col h-full min-h-[200px] ring-0 p-4 border-2 rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer overflow-hidden`}
    >
      <div className="" style={{ borderColor: borderColor }}>
        <h3
          className={`font-bold text-lg wrap-break-word leading-tight ${contrastColor}`}
        >
          {title}
        </h3>
      </div>

      <hr className="border " style={{ borderColor: borderColor }} />

      <div className="flex-1">
        <p
          className={`text-sm line-clamp-5 leading-relaxed whitespace-pre-wrap wrap-break-word ${contrastColor}`}
        >
          {description}
        </p>
      </div>
    </Card>
  );
}
