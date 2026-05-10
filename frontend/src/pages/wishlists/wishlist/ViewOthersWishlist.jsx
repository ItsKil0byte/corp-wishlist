import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "@/components/navigation/PageHeader";
import WishCard from "@/components/WishCard";
import WishlistService from "@/services/WishlistService";
import Loading from "@/pages/Loading";
import { Gift } from "lucide-react";

const ViewOthersWishlist = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const wishlistId = searchParams.get("id");
  const groupId = searchParams.get("from");
  const userId = searchParams.get("user");

  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await WishlistService.getWishlist(wishlistId);
        setWishlist(data);
      } catch (error) {
        console.error("Ошибка при загрузке чужого вишлиста:", error);
      } finally {
        setLoading(false);
      }
    };

    if (wishlistId) {
      fetchWishlist();
    }
  }, [wishlistId]);

  if (loading) return <Loading message="Загружаю список желаний..." />;

  if (!wishlist) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <span className="text-xl font-semibold text-gray-500">
          Вишлист не найден
        </span>
        <button
          onClick={() => navigate(-1)}
          className="text-main-theme font-bold hover:underline"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <PageHeader
        title={`${wishlist.icon || "🎁"} ${wishlist.name}`}
        onBack={() => navigate(`/profile/others?id=${userId}&from=${groupId}`)}
      />

      <div className="bg-main-theme-lite/30 border-main-theme-lite-border flex items-center gap-3 rounded-xl border px-2 py-3">
        <Gift className="text-main-theme size-5" />
        <span className="text-sm font-medium text-gray-600">
          Список желаний пользователя (всего {wishlist.wishes?.length || 0})
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.wishes && wishlist.wishes.length > 0 ? (
          wishlist.wishes.map((wish) => (
            <div key={wish.id} className="cursor-default">
              <WishCard
                title={wish.title}
                description={wish.description}
                color={wish.color}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-gray-100 py-12 text-center">
            <p className="text-gray-400">В этом списке пока нет желаний</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOthersWishlist;
