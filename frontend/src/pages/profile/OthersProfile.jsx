import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PageHeader from "@/components/navigation/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User as UserIcon,
  Gift,
  ChevronRight,
  Heart,
  Palette,
} from "lucide-react";
import UserInfoService from "@/services/UserInfoService";
import WishlistService from "@/services/WishlistService";
import Loading from "@/pages/Loading";

export default function OthersProfile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get("id");
  const groupId = searchParams.get("from");

  const [userInfo, setUserInfo] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, userWishlists] = await Promise.all([
          UserInfoService.getInfo(Number(userId)),
          WishlistService.getWishlistsByUserId(userId),
        ]);
        setUserInfo(userData);
        setWishlists(userWishlists);
        sessionStorage.setItem(
          "others_wishlists",
          JSON.stringify(userWishlists),
        );
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (loading) return <Loading message="Загружаю профиль..." />;
  if (!userInfo)
    return (
      <div className="p-8 text-center text-gray-500">
        Пользователь не найден
      </div>
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <PageHeader
        title="Профиль участника"
        onBack={() => navigate(`/groups/group/view?id=${groupId}`)}
      />

      <Card className="overflow-hidden border-2 border-gray-100 shadow-sm">
        <CardContent className="flex flex-col items-center gap-8 pt-8 pb-8 sm:flex-row">
          <Avatar className="size-32 border-4 border-white shadow-xl">
            <AvatarImage src={userInfo.photo_url} />
            <AvatarFallback className="bg-main-theme text-4xl font-bold text-white uppercase">
              {userInfo.firstName
                ? userInfo.firstName[0]
                : userInfo.username?.[0] || <UserIcon />}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight text-gray-900">
              {userInfo.firstName || userInfo.lastName
                ? `${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim()
                : "Пользователь"}
            </h2>
            <div className="bg-main-theme/10 text-main-theme mx-auto inline-flex w-fit items-center justify-center rounded-full px-3 py-1 text-sm font-bold sm:mx-0 sm:justify-start">
              @{userInfo.username || "логин"}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Heart className="size-5 text-red-400" />
            <CardTitle className="text-lg font-bold">Хобби</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-base ${!userInfo.hobbies ? "text-gray-400 italic" : "text-gray-600"}`}
            >
              {userInfo.hobbies || "Пользователь еще не указал свои хобби"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Palette className="size-5 text-blue-400" />
            <CardTitle className="text-lg font-bold">Интересы</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-base ${!userInfo.interests ? "text-gray-400 italic" : "text-gray-600"}`}
            >
              {userInfo.interests || "Пользователь еще не указал интересы"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1">
          <Gift className="text-main-theme size-6" />
          <h3 className="text-xl font-bold text-gray-900">
            Вишлисты пользователя
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {wishlists.length > 0 ? (
            wishlists.map((wishlist) => (
              <Card
                key={wishlist.id}
                onClick={() =>
                  navigate(
                    `/wishlists/wishlist/view/others?id=${wishlist.id}&from=${groupId}&user=${userId}`,
                  )
                }
                className="group hover:border-main-theme/30 cursor-pointer rounded-xl border-2 border-gray-100 transition-all hover:shadow-md"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-main-theme-lite border-main-theme-lite-border flex size-12 items-center justify-center rounded-lg border text-2xl">
                      {wishlist.icon || "🎁"}
                    </div>
                    <div className="flex flex-col">
                      <span className="group-hover:text-main-theme font-bold text-gray-900 transition-colors">
                        {wishlist.name}
                      </span>
                      <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Желаний ({wishlist.wishes.length})
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="group-hover:text-main-theme size-5 text-gray-300 transition-colors" />
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="rounded-xl border-2 border-dashed border-gray-100 p-6 text-center text-gray-400 italic">
              У этого пользователя пока нет публичных вишлистов
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
