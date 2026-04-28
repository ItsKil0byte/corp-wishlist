import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

export default function MemberCard({ user, groupId }) {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/profile/others?id=${user.userId}&from=${groupId}`)}
            className="p-4 bg-white border-2 border-gray-100 flex flex-col items-center text-center gap-3 cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 rounded-xl"
        >
            <Avatar className="size-20 border-2 border-main-theme-lite shadow-sm">
                <AvatarImage src={user.photo_url} />
                <AvatarFallback className="bg-main-theme-lite text-xl font-bold text-main-theme uppercase">
                    {user.firstName ? user.firstName[0] : (user.username ? user.username[0] : "?")}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0.5 min-w-0 w-full">
        <span className="font-bold text-gray-900 truncate px-1">
          {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "Пользователь"}
        </span>
                <span className="text-sm text-gray-500 truncate">
          @{user.username || "логин"}
        </span>
            </div>
        </Card>
    );
}