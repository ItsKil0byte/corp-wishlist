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
      className={`flex h-full min-h-[200px] cursor-pointer flex-col overflow-hidden rounded-lg border-2 p-4 ring-0 transition-all hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="relative flex h-48 w-full shrink-0 items-center justify-center overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ borderColor: borderColor }}
            className="h-full w-full border-2 object-cover transition-transform duration-500"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundColor: color }}
          />
        )}
        {!image && <ImageIcon className="z-10 size-8 text-gray-900" />}
      </div>

      <div className="" style={{ borderColor: borderColor }}>
        <h3
          className={`text-lg leading-tight font-bold wrap-break-word ${contrastColor}`}
        >
          {title}
        </h3>
      </div>

      <hr className="border" style={{ borderColor: borderColor }} />

      <div className="flex-1">
        <p
          className={`line-clamp-5 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap ${contrastColor}`}
        >
          {description}
        </p>
      </div>
    </Card>
  );
}
