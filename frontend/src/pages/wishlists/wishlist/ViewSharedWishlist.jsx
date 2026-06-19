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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-main-theme animate-spin text-4xl">🎁</div>
      </div>
    );
  }

  if (error || !wishlist) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Ой! Ссылка недействительна
        </h1>
        <p className="mb-6 text-gray-500">
          Возможно, вишлист был удален или время действия ссылки истекло.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-main-theme hover:bg-main-theme-hover border-main-theme-border h-12 border-2 text-base font-bold text-gray-900"
        >
          На главную
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 p-4 font-sans">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <header className="flex items-center gap-5 rounded-lg border-2 border-gray-200 bg-white p-6 sm:p-8">
          <div className="bg-main-theme-lite flex size-16 shrink-0 items-center justify-center rounded-full text-3xl">
            <Gift className="text-main-theme size-8" />
          </div>
          <div>
            <h1 className="line-clamp-1 text-2xl font-black tracking-tight text-gray-900 uppercase sm:text-3xl">
              {wishlist.title}
            </h1>
            <p className="mt-1 font-medium text-gray-500">
              Публичный вишлист • {wishlist.wishes?.length || 0} желаний
            </p>
          </div>
        </header>

        <main className="rounded-lg border-2 border-gray-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.wishes?.map((wish) => (
              <div key={wish.id} className="cursor-default">
                <WishCard
                  title={wish.title}
                  description={wish.description}
                  color={wish.color}
                  imageUrls={wish.imageUrls}
                />
              </div>
            ))}
          </div>

          <hr className="my-6 border border-gray-200" />

          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="mb-1 text-xl font-bold text-gray-900">
                Вишлист создан в{" "}
                <span className="text-main-theme text-shadow font-black">
                  CorpWishlist
                </span>
              </h2>
              <p className="font-medium text-gray-500">
                Создай свой собственный вишлист за пару минут и делись им с
                друзьями и коллегами!
              </p>
            </div>

            <Button
              onClick={() => navigate("/auth")}
              className="bg-main-theme border-main-theme-border h-12 border-2 px-4 text-base font-bold text-gray-900 transition-all hover:scale-105 hover:brightness-95"
            >
              Создать свой вишлист
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
