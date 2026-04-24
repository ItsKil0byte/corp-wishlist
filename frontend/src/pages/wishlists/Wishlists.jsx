import React, { useState } from "react";
import WishlistService from "../../services/WishlistService.js";
import PageHeader from "@/components/navigation/PageHeader.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import WishlistCard from "@/components/WishlistCard.jsx";
import { useOutletContext } from "react-router-dom";

export default function Wishlists() {
  const { wishlists, fetchWishlists } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");

  const handleModal = async () => {
    if (isModalOpen && newWishlistName.trim() !== "") {
      try {
        await WishlistService.addWishlist(newWishlistName, "#000000", "🎁");
        setNewWishlistName("");
        setIsModalOpen(false);
        fetchWishlists();
      } catch (error) {
        console.error("Ошибка при создании вишлиста:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <PageHeader title="Мои вишлисты">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-main-theme hover:bg-main-theme-hover h-12 px-4 text-gray-900 border-2 border-main-theme-border font-bold rounded-lg transition-all text-lg sm:w-auto w-full"
        >
          <Sparkles />
          Создать новый вишлист
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {wishlists.map((wishlist) => (
          <WishlistCard
            key={wishlist.id}
            id={wishlist.id}
            name={wishlist.name}
            icon={wishlist.icon}
            wishCount={wishlist.wishesCount}
          />
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Создание нового вишлиста
            </DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="wishlist-name" className="mb-2">
              Название
            </Label>
            <Input
              value={newWishlistName}
              onChange={(e) => setNewWishlistName(e.target.value)}
              placeholder="Например: День рождения, Новый год и т.д."
              className="rounded-lg border-2 h-10 border-gray-300"
            />
          </div>
          <DialogFooter className="flex gap-2 sm:gap-4 sm:flex-row pt-0 bg-white border-none">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="w-full sm:flex-1 h-12 text-gray-900 font-semibold text-base border-2 border-gray-200 hover:bg-gray-200"
            >
              Отмена
            </Button>
            <Button
              onClick={handleModal}
              className="w-full sm:flex-1 sm:w-auto bg-main-theme hover:bg-main-theme-hover h-12 px-4 text-gray-900 border-2 border-main-theme-border font-bold rounded-lg transition-all text-lg"
            >
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
