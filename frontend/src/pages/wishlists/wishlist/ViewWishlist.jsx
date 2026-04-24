import PageHeader from "@/components/navigation/PageHeader";
import { Button } from "@/components/ui/button";
import WishlistService from "@/services/WishlistService";
import WishService from "@/services/WishService";
import { Settings, Share2, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

export default function ViewWishlist() {
  const [searchParams] = useSearchParams();
  const wishlistId = searchParams.get("id");
  const navigate = useNavigate();
  const { fetchWishlists } = useOutletContext();
  const [wishlist, setWishlist] = useState(null);
  const [wishes, setWishes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishTitle, setWishTitle] = useState("");
  const [wishDescription, setWishDescription] = useState("");
  const [wishColor, setWishColor] = useState("#ffffff");

  const fetchData = async () => {
    if (!wishlistId) {
      navigate("/wishlists");
      return;
    }
    try {
      const [wishlistResponse, wishesResponse] = await Promise.all([
        WishlistService.getWishlist(wishlistId),
        WishService.getWishes(wishlistId),
      ]);
      setWishlist(wishlistResponse);
      setWishes(wishesResponse);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [wishlistId]);

  const handleModalOpen = async () => {
    if (!wishTitle.trim()) {
      return;
    }
    try {
      await WishService.addWish(
        wishlistId,
        wishTitle,
        wishDescription,
        wishColor,
      );
      setWishTitle("");
      setWishDescription("");
      setWishColor("#ffffff");
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Ошибка при добавлении желания:", error);
    }
  };

  if (!wishlist) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <PageHeader title={`${wishlist.icon} ${wishlist.name}`}>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-main-theme hover:bg-main-theme-hover h-12 px-4 text-gray-900 border-2 border-main-theme-border font-bold rounded-lg transition-all text-lg sm:w-auto w-full"
        >
          <Sparkle />
          Добавить
        </Button>

        <Button
          onClick={() => alert("Функция поделиться в разработке")}
          className="bg-[#02A2EC] hover:bg-[#0098df] h-12 px-4 text-gray-900 border-2 border-[#007CD5] font-bold rounded-lg transition-all text-lg sm:w-auto w-full"
        >
          <Share2 />
          Поделиться
        </Button>

        <Button
          onClick={() => alert("Функция настроек в разработке")}
          className="bg-[#ECBD02] hover:bg-[#dab110] h-12 px-4 text-gray-900 border-2 border-[#D59F00] font-bold rounded-lg transition-all text-lg sm:w-auto w-full"
        >
          <Settings />
          Настройки
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {wishes.map((wish) => `${wish.color} ${wish.title}`)}
      </div>
    </div>
  );
}
