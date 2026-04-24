import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistService from "../../services/WishlistService.js";
import Loading from "../Loading.jsx";
import FlatList from "../../components/lists/FlatList.jsx";
import PlusButton from "../../components/buttons/PlusButton.jsx";
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

export default function Wishlists() {
  const [wishlists, setWishlists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");

  const fetchData = async () => {
    try {
      const data = await WishlistService.getWishlists();
      setWishlists(data);
    } catch (error) {
      console.error("Ошибка при загрузке вишлистов:", error);
    }
  };

  const handleModal = async () => {
    if (isModalOpen && newWishlistName.trim() !== "") {
      try {
        await WishlistService.addWishlist(newWishlistName, "#000000", "list");
        setNewWishlistName("");
        setIsModalOpen(false);
        fetchData();
      } catch (error) {
        console.error("Ошибка при создании вишлиста:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <PageHeader title="Мои вишлисты">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-main-theme hover:bg-main-theme-hover h-12 px-4 text-gray-900 border-2 border-main-theme-border font-bold rounded-lg transition-all text-lg"
        >
          <Sparkles />
          Создать новый вишлист
        </Button>
      </PageHeader>

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
          <DialogFooter className="bg-white border-none flex pt-0">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="flex-1 h-12 text-gray-900 font-semibold text-base border-2 border-gray-200 hover:bg-gray-200"
            >
              Отмена
            </Button>
            <Button
              onClick={handleModal}
              className="flex-1 bg-main-theme hover:bg-main-theme-hover h-12 px-4 text-gray-900 border-2 border-main-theme-border font-bold rounded-lg transition-all text-lg"
            >
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
