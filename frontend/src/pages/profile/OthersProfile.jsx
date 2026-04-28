import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import PageHeader from "@/components/navigation/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon, Gift, ChevronRight, Heart, Palette } from "lucide-react";
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
                    WishlistService.getWishlistsByUserId(userId)
                ]);
                setUserInfo(userData);
                setWishlists(userWishlists);
                sessionStorage.setItem("others_wishlists", JSON.stringify(userWishlists));
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchData();
    }, [userId]);

    if (loading) return <Loading message="Загружаю профиль..." />;
    if (!userInfo) return <div className="p-8 text-center text-gray-500">Пользователь не найден</div>;

    return (
        <div className="p-4 flex flex-col gap-6">
            <PageHeader
                title="Профиль участника"
                onBack={() => navigate(`/groups/group/view?id=${groupId}`)}
            />

            <Card className="border-2 border-gray-100 shadow-sm overflow-hidden">
                <CardContent className="pt-8 pb-8 flex flex-col sm:flex-row items-center gap-8">
                    <Avatar className="size-32 border-4 border-white shadow-xl">
                        <AvatarImage src={userInfo.photo_url} />
                        <AvatarFallback className="bg-main-theme text-4xl font-bold text-white uppercase">
                            {userInfo.firstName ? userInfo.firstName[0] : (userInfo.username?.[0] || <UserIcon />)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col text-center sm:text-left gap-1">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            {userInfo.firstName || userInfo.lastName
                                ? `${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim()
                                : "Пользователь"}
                        </h2>
                        <div className="inline-flex items-center justify-center sm:justify-start px-3 py-1 rounded-full bg-main-theme/10 text-main-theme font-bold text-sm w-fit mx-auto sm:mx-0">
                            @{userInfo.username || "логин"}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <Heart className="size-5 text-red-400" />
                        <CardTitle className="text-lg font-bold">Хобби</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-base ${!userInfo.hobbies ? "text-gray-400 italic" : "text-gray-600"}`}>
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
                        <p className={`text-base ${!userInfo.interests ? "text-gray-400 italic" : "text-gray-600"}`}>
                            {userInfo.interests || "Пользователь еще не указал интересы"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2 px-1">
                    <Gift className="text-main-theme size-6" />
                    <h3 className="text-xl font-bold text-gray-900">Вишлисты пользователя</h3>
                </div>

                <div className="flex flex-col gap-3">
                    {wishlists.length > 0 ? (
                        wishlists.map((wishlist) => (
                            <Card
                                key={wishlist.id}
                                onClick={() => navigate(`/wishlists/wishlist/view/others?id=${wishlist.id}&from=${groupId}&user=${userId}`)}
                                className="group border-2 border-gray-100 hover:border-main-theme/30 hover:shadow-md transition-all cursor-pointer rounded-xl"
                            >
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-lg bg-main-theme-lite flex items-center justify-center text-2xl border border-main-theme-lite-border">
                                            {wishlist.icon || "🎁"}
                                        </div>
                                        <div className="flex flex-col">
                      <span className="font-bold text-gray-900 group-hover:text-main-theme transition-colors">
                        {wishlist.name}
                      </span>
                                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        Желаний ({wishlist.wishes.length})
                      </span>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-gray-300 group-hover:text-main-theme transition-colors size-5" />
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-400 italic p-6 text-center border-2 border-dashed border-gray-100 rounded-xl">
                            У этого пользователя пока нет публичных вишлистов
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}