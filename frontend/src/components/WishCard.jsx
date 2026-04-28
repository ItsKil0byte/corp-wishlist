import { Card } from "@/components/ui/card";
import { getBorderColor, getContrastColor } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

export default function WishCard({
  title,
  description,
  color,
  imageUrls,
  onClick,
}) {
  const contrastColor = getContrastColor(color);
  const borderColor = getBorderColor(color);

  // TODO: Переписать на использование компонентов из UI библиотеки

  const API_BASE_URL =
    import.meta.env.VITE_API_URL?.replace("/api", "") ||
    "http://localhost:8080";
  const image =
    imageUrls && imageUrls.length > 0 ? `${API_BASE_URL}${imageUrls[0]}` : null;

  return (
    <Card
      onClick={onClick}
      style={{
        backgroundColor: color,
        borderColor: borderColor,
      }}
      className={`flex flex-col h-full min-h-[200px] ring-0 p-4 border-2 rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer overflow-hidden`}
    >
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ borderColor: borderColor }}
            className="w-full h-full object-cover transition-transform duration-500 border-2"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundColor: color }}
          />
        )}
        {!image && <ImageIcon className="size-8 text-gray-900 z-10" />}
      </div>

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
