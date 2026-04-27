import { Button } from "@/components/ui/button";
import WishCard from "@/components/WishCard";
import LinkService from "@/services/LinkService";
import { Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewSharedWishlist() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await LinkService.getEntity(token);
        setWishlist(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin text-main-theme text-4xl">🎁</div>
      </div>
    );
  }

  if (error || !wishlist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ой! Ссылка недействительна
        </h1>
        <p className="text-gray-500 mb-6">
          Возможно, вишлист был удален или время действия ссылки истекло.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-main-theme hover:bg-main-theme-hover border-2 border-main-theme-border text-gray-900 font-bold text-base h-12"
        >
          На главную
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 py-4 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <header className="bg-white rounded-lg border-2 border-gray-200 p-6 sm:p-8 flex items-center gap-5">
          <div className="size-16 rounded-full bg-main-theme-lite flex items-center justify-center text-3xl shrink-0">
            <Gift className="text-main-theme size-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight line-clamp-1">
              {wishlist.title}
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Публичный вишлист • {wishlist.wishes?.length || 0} желаний
            </p>
          </div>
        </header>

        <main className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.wishes?.map((wish) => (
              <div key={wish.id} className="cursor-default">
                <WishCard
                  title={wish.title}
                  description={wish.description}
                  color={wish.color}
                />
              </div>
            ))}
          </div>

          <hr className="my-6 border border-gray-200" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Вишлист создан в{" "}
                <span className="text-main-theme text-shadow font-black">
                  CorpWishlist
                </span>
              </h2>
              <p className="text-gray-500 font-medium">
                Создай свой собственный вишлист за пару минут и делись им с
                друзьями и коллегами!
              </p>
            </div>

            <Button
              onClick={() => navigate("/auth")}
              className="bg-main-theme border-2 border-main-theme-border text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all"
            >
              Создать свой вишлист
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
