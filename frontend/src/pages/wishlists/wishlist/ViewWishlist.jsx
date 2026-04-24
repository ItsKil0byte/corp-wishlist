import PageHeader from "@/components/navigation/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  const handleModal = async () => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {wishes.map((wish) => (
          <WishCard
            key={wish.id}
            title={wish.title}
            description={wish.description}
            color={wish.color}
            onClick={() =>
              alert("Функция просмотра деталей желания в разработке")
            }
          />
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Добавить желание
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="wish-title" className="mb-2">
                  Название
                </Label>
                <Input
                  value={wishTitle}
                  placeholder="Например: iPhone 17 Pro и т.д."
                  onChange={(e) => setWishTitle(e.target.value)}
                  className="rounded-lg border-2 h-10 border-gray-300 shadow-xs"
                />
              </div>
              <div className="w-16">
                <Label htmlFor="wish-color" className="mb-2">
                  Цвет
                </Label>
                <Input
                  type="color"
                  value={wishColor}
                  onChange={(e) => setWishColor(e.target.value)}
                  className="w-full h-10 border-2 border-gray-300 rounded-lg shadow-xs"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="wish-description" className="mb-2">
                Описание
              </Label>
              <Textarea
                value={wishDescription}
                placeholder="Дополнительные детали, ссылки и т.д."
                onChange={(e) => setWishDescription(e.target.value)}
                className="rounded-lg border-2 min-h-32 border-gray-300 shadow-xs"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-4 sm:flex-row pt-0 bg-white border-none">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="w-full sm:flex-1 h-12 text-gray-900 font-semibold text-base border-2 border-gray-200 hover:bg-gray-200 shadow-xs rounded-lg transition-all"
            >
              Отмена
            </Button>
            <Button
              onClick={handleModal}
              className="w-full sm:flex-1 sm:w-auto bg-main-theme hover:bg-main-theme-hover h-12 px-4 text-gray-900 border-2 border-main-theme-border font-bold rounded-lg transition-all text-lg shadow-xs"
            >
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
