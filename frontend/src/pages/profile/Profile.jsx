import React from 'react';
import PageHeader from "@/components/navigation/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useOutletContext, useNavigate } from "react-router-dom";
import InfoSection from "@/components/InfoSection";
import {User as UserIcon, Gift, ChevronRight, Heart} from "lucide-react";

export default function Profile() {
    const { user, wishlists, fetchUser } = useOutletContext();
    const navigate = useNavigate();

    if (!user) return <div className="p-8 text-center animate-pulse text-gray-400">Загрузка профиля...</div>;

    return (
        <div className="p-4 flex flex-col gap-6">
            <PageHeader title="Мой профиль" />

            <Card className="border-2 border-gray-100 shadow-sm bg-gradient-to-br from-main-theme-lite/50 to-white overflow-hidden">
                <CardContent className="pt-8 pb-8 flex flex-col sm:flex-row items-center gap-8">
                    <Avatar className="size-32 border-4 border-white shadow-xl">
                        <AvatarImage src={user.photo_url} />
                        <AvatarFallback className="bg-main-theme text-4xl font-bold text-white uppercase">
                            {user.firstName ? user.firstName[0] : (user.username?.[0] || <UserIcon className="size-12" />)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col text-center sm:text-left gap-1">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            {user.firstName || user.lastName
                                ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                                : "Пользователь"}
                        </h2>
                        <div className="inline-flex items-center justify-center sm:justify-start px-3 py-1 rounded-full bg-main-theme/10 text-main-theme font-bold text-sm w-fit mx-auto sm:mx-0">
                            @{user.username || "логин"}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <Gift className="text-main-theme size-6" />
                    <h3 className="text-xl font-bold text-gray-900">Мои вишлисты</h3>
                </div>

                <div className="flex flex-col gap-3">
                    {wishlists.length > 0 ? (
                        wishlists.map((wishlist) => (
                            <Card
                                key={wishlist.id}
                                onClick={() => navigate(`/wishlists/wishlist/view?id=${wishlist.id}`)}
                                className="group border-2 border-gray-100 hover:border-main-theme/30 hover:shadow-md transition-all cursor-pointer rounded-xl overflow-hidden"
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
                        желаний ({wishlist.wishes.length})
                      </span>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-gray-300 group-hover:text-main-theme transition-colors size-5" />
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-400 italic p-4 text-center border-2 border-dashed border-gray-100 rounded-xl">
                            У вас пока нет вишлистов
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}