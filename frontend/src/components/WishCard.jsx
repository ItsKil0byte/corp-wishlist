import { Card } from "@/components/ui/card";
import { getBorderColor, getContrastColor } from "@/lib/utils";

export default function WishCard({ title, description, color, onClick }) {
  const contrastColor = getContrastColor(color);
  const borderColor = getBorderColor(color);

  return (
    <Card
      onClick={onClick}
      style={{
        backgroundColor: color,
        borderColor: borderColor,
      }}
      className={`flex flex-col h-full min-h-[200px] border-2 rounded-lg shadow-md hover:scale-102 active:scale-95 transition-all cursor-pointer overflow-hidden`}
    >
      <div
        className="px-4 pb-3 border-b-2"
        style={{ borderColor: borderColor }}
      >
        <h3
          className={`font-bold text-lg wrap-break-word leading-tight ${contrastColor}`}
        >
          {title}
        </h3>
      </div>
      <div className="px-4 flex-1">
        <p
          className={`text-sm line-clamp-5 leading-relaxed whitespace-pre-wrap wrap-break-word ${contrastColor}`}
        >
          {description}
        </p>
      </div>
    </Card>
  );
}
