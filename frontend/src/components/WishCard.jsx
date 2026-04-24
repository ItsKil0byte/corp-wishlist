import { Card } from "@/components/ui/card";

export default function WishCard({ title, description, color, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="flex flex-col h-full min-h-[200px] border-gray-200 border rounded-lg shadow-xs hover:shadow-md transition-all group cursor-pointer active:scale-[0.98] overflow-hidden"
    >
      <div className="px-4 pb-3 border-b border-gray-100">
        <h3 className="font-bold text-lg text-gray-900 leading-tight">
          {title}
        </h3>
      </div>
      <div className="px-4 flex-1">
        <p className="text-gray-600 text-sm line-clamp-5 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Цветной акцент внизу карточки */}
      {/* TODO: Реализовать цветной акцент на всей карточке с перекрасом цвета */}
      <div
        className="flex h-2 mx-4 rounded-full"
        style={{ backgroundColor: color }}
      />
    </Card>
  );
}
