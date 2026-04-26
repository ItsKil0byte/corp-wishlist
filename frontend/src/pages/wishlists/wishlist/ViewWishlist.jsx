import Wish from "@/components/modals/Wish";
import PageHeader from "@/components/navigation/PageHeader";
import { Button } from "@/components/ui/button";
import WishCard from "@/components/WishCard";
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
  const [editingWish, setEditingWish] = useState(null);

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

  const openAddModal = () => {
    setEditingWish(null);
    setIsModalOpen(true);
  };

  const openEditModal = (wish) => {
    setEditingWish(wish);
    setIsModalOpen(true);
  };

  const handleSaveWish = async (wishData) => {
    try {
      if (editingWish) {
        await WishService.updateWish(
          editingWish.id,
          wishData.title,
          wishData.description,
          wishData.color,
        );
      } else {
        await WishService.addWish(
          wishlistId,
          wishData.title,
          wishData.description,
          wishData.color,
        );
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Ошибка при сохранении желания:", error);
    }
  };

  const handleDeleteWish = async (wishId) => {
    try {
      await WishService.deleteWish(wishId);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Ошибка при удалении желания:", error);
    }
  };

  if (!wishlist) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <PageHeader
        title={`${wishlist.icon} ${wishlist.name}`}
        onBack={() => navigate("/wishlists")}
      >
        <Button
          onClick={() => openAddModal()}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {wishes.map((wish) => (
          <WishCard
            key={wish.id}
            title={wish.title}
            description={wish.description}
            color={wish.color}
            onClick={() => openEditModal(wish)}
          />
        ))}
      </div>

      <Wish
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWish}
        onDelete={handleDeleteWish}
        data={editingWish}
      />
    </div>
  );
}
