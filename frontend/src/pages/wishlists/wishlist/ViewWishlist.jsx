import Wishlist from "@/components/modals/Wishlist";
import Wish from "@/components/modals/Wish";
import PageHeader from "@/components/navigation/PageHeader";
import { Button } from "@/components/ui/button";
import WishCard from "@/components/WishCard";
import WishlistService from "@/services/WishlistService";
import LinkService from "@/services/LinkService";
import WishService from "@/services/WishService";
import toast from "react-hot-toast";
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    const tId = toast.loading("Сохраняем желание...");
    try {
      let savedWish;

      if (editingWish) {
        savedWish = await WishService.updateWish(
          editingWish.id,
          wishData.title,
          wishData.description,
          wishData.color,
        );
      } else {
        savedWish = await WishService.addWish(
          wishlistId,
          wishData.title,
          wishData.description,
          wishData.color,
        );
      }

      // ID желания
      const wishId = savedWish?.id || editingWish?.id;

      if (
        editingWish &&
        editingWish.imageUrls &&
        editingWish.imageUrls.length > 0
      ) {
        if (wishData.isImageCleared || wishData.imageFile) {
          const oldUrl = editingWish.imageUrls[0];
          const filename = oldUrl.split("/").pop();

          await WishService.deleteImage(wishId, filename);
        }
      }

      if (wishData.imageFile && wishId) {
        toast.loading("Загружаем картинки...", { id: tId });
        await WishService.uploadImages(wishId, [wishData.imageFile]);
      }

      toast.success("Успешно!", { id: tId });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Проищошла ошибка!", { id: tId });
      console.error("Ошибка при сохранении желания:", error);
    }
  };

  const handleDeleteWish = async () => {
    try {
      await WishService.deleteWish(editingWish.id);
      setIsModalOpen(false);
      fetchData();
      toast.success("Желание удалено");
    } catch (error) {
      console.error("Ошибка при удалении желания:", error);
    }
  };

  const handleSaveWishlist = async (wishlistData) => {
    try {
      await WishlistService.updateWishlist(
        wishlist.id,
        wishlistData.name,
        wishlistData.color,
        wishlistData.icon,
      );
      setIsSettingsOpen(false);
      fetchData();
      toast.success("Настройки сохранены");
    } catch (error) {
      console.error("Ошибка при сохранении вишлиста:", error);
      toast.error("Ошибка при сохранении настроек");
    }
  };

  const handleDeleteWishlist = async () => {
    try {
      await WishlistService.deleteWishlist(wishlist.id);
      setIsSettingsOpen(false);
      fetchWishlists();
      navigate("/wishlists");
      toast.success("Вишлист удален");
    } catch (error) {
      console.error("Ошибка при удалении вишлиста:", error);
      toast.error("Ошибка при удалении вишлиста");
    }
  };

  const handleShareWishlist = async () => {
    try {
      const linkInfo = await LinkService.getLinkInfo(
        "WISHLIST_SHARE",
        wishlistId,
      );
      const link = `${origin}/link?start_param=${linkInfo.token}`;
      navigator.clipboard.writeText(link);
      toast.success("Ссылка скопирована в буфер обмена!");
    } catch (error) {
      console.error("Ошибка при копировании ссылки:", error);
      toast.error("Ошибка при копировании ссылки");
    }
  };

  // Заглушка
  if (!wishlist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-main-theme text-4xl">🎁</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PageHeader
        title={`${wishlist.icon} ${wishlist.name}`}
        onBack={() => navigate("/wishlists")}
      >
        <Button
          onClick={() => openAddModal()}
          className="bg-main-theme border-2 border-main-theme-border text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all w-full sm:w-auto"
        >
          <Sparkle />
          Добавить
        </Button>

        <Button
          onClick={handleShareWishlist}
          className="bg-[#02A2EC] border-2 border-[#007CD5] text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all w-full sm:w-auto"
        >
          <Share2 />
          Поделиться
        </Button>

        <Button
          onClick={() => setIsSettingsOpen(true)}
          className="bg-[#f5c60c] border-2 border-[#dab110] text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all w-full sm:w-auto"
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
            imageUrls={wish.imageUrls}
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

      <Wishlist
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveWishlist}
        onDelete={handleDeleteWishlist}
        data={wishlist}
      />
    </div>
  );
}
