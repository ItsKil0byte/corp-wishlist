import React, { useState } from "react";
import WishlistService from "@/services/WishlistService.js";
import PageHeader from "@/components/navigation/PageHeader.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Sparkles } from "lucide-react";
import WishlistCard from "@/components/WishlistCard.jsx";
import { useOutletContext } from "react-router-dom";
import Wishlist from "@/components/modals/Wishlist.jsx";

export default function Wishlists() {
  const { wishlists, fetchWishlists } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveWishlist = async (wishlistData) => {
    try {
      await WishlistService.addWishlist(
        wishlistData.name,
        wishlistData.color,
        wishlistData.icon,
      );
      setIsModalOpen(false);
      fetchWishlists();
    } catch (error) {
      console.error("Ошибка при создании вишлиста:", error);
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
            wishCount={wishlist.wishes.length}
          />
        ))}
      </div>

      <Wishlist
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWishlist}
        onDelete={() => null}
      />
    </div>
  );
}
