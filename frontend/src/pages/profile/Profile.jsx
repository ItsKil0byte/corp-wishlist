import React from "react";
import PageHeader from "@/components/navigation/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useOutletContext, useNavigate } from "react-router-dom";
import InfoSection from "@/components/InfoSection";
import { User as UserIcon, Gift, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, wishlists, fetchUser } = useOutletContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  if (!user)
    return (
      <div className="animate-pulse p-8 text-center text-gray-400">
        Загрузка профиля...
      </div>
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <PageHeader title="Мой профиль">
        <Button
          className="h-12 w-full border-2 border-red-700 bg-red-500 px-4 text-base font-bold text-gray-900 transition-all hover:scale-105 hover:brightness-95 sm:w-auto"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </PageHeader>

      <Card className="from-main-theme-lite/50 overflow-hidden border-2 border-gray-100 bg-linear-to-br to-white shadow-sm">
        <CardContent className="flex flex-col items-center gap-8 pt-8 pb-8 sm:flex-row">
          <Avatar className="size-32 border-4 border-white shadow-xl">
            <AvatarImage src={user.photo_url} />
            <AvatarFallback className="bg-main-theme text-4xl font-bold text-white uppercase">
              {user.firstName
                ? user.firstName[0]
                : user.username?.[0] || <UserIcon className="size-12" />}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight text-gray-900">
              {user.firstName || user.lastName
                ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                : "Пользователь"}
            </h2>
            <div className="bg-main-theme/10 text-main-theme mx-auto inline-flex w-fit items-center justify-center rounded-full px-3 py-1 text-sm font-bold sm:mx-0 sm:justify-start">
              @{user.username || "логин"}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoSection
          title="Хобби"
          type="hobbies"
          value={user.hobbies}
          user={user}
          fetchUser={fetchUser}
        />
        <InfoSection
          title="Интересы"
          type="interests"
          value={user.interests}
          user={user}
          fetchUser={fetchUser}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Gift className="text-main-theme size-6" />
          <h3 className="text-xl font-bold text-gray-900">Мои вишлисты</h3>
        </div>

        <div className="flex flex-col gap-3">
          {wishlists.length > 0 ? (
            wishlists.map((wishlist) => (
              <Card
                key={wishlist.id}
                onClick={() =>
                  navigate(`/wishlists/wishlist/view?id=${wishlist.id}`)
                }
                className="group hover:border-main-theme/30 cursor-pointer overflow-hidden rounded-xl border-2 border-gray-100 transition-all hover:shadow-md"
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
                        желаний ({wishlist.wishes.length})
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="group-hover:text-main-theme size-5 text-gray-300 transition-colors" />
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="rounded-xl border-2 border-dashed border-gray-100 p-4 text-center text-gray-400 italic">
              У вас пока нет вишлистов
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
