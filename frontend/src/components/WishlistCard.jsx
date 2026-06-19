import { Gift } from "lucide-react";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

export default function WishlistCard({ id, name, icon, wishCount }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/wishlists/wishlist/view?id=${id}`)}
      className="bg-main-theme-lite ring-main-theme-lite-border flex cursor-pointer flex-row items-center gap-4 rounded-lg p-6 ring-2 transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
    >
      <div className="bg-main-theme border-main-theme-border flex size-16 shrink-0 items-center justify-center rounded-full border-2 text-xl">
        {icon || name[0].toUpperCase()}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="truncate text-lg leading-tight font-bold text-gray-900">
          {name}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <Gift className="text-main-theme size-4" />
          <span className="text-sm">
            {wishCount || 0} {wishCount === 1 ? "подарок" : "подарков"}
          </span>
        </div>
      </div>
    </Card>
  );
}
