import { Gift } from "lucide-react";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

export default function WishlistCard({ id, name, icon, wishCount }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/wishlists/wishlist/view?id=${id}`)}
      className="p-6 bg-main-theme-lite ring-2 ring-main-theme-lite-border flex flex-row items-center gap-4 cursor-pointer transition-all rounded-lg active:scale-95 hover:-translate-y-1"
    >
      <div className="flex items-center justify-center size-16 rounded-full bg-main-theme border-2 border-main-theme-border text-xl shrink-0">
        {icon || name[0].toUpperCase()}
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 truncate leading-tight">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <Gift className="size-4 text-main-theme" />
          <span className="text-sm">
            {wishCount || 0} {wishCount === 1 ? "подарок" : "подарков"}
          </span>
        </div>
      </div>
    </Card>
  );
}
