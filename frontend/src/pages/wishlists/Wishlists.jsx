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
          className="bg-main-theme border-2 border-main-theme-border text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all w-full sm:w-auto"
        >
          <Sparkles />
          Создать новый вишлист
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
