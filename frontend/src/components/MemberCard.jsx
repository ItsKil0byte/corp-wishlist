import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

export default function MemberCard({ user, groupId }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() =>
        navigate(`/profile/others?id=${user.userId}&from=${groupId}`)
      }
      className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-gray-100 bg-white p-4 text-center transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <Avatar className="border-main-theme-lite size-20 border-2 shadow-sm">
        <AvatarImage src={user.photo_url} />
        <AvatarFallback className="bg-main-theme-lite text-main-theme text-xl font-bold uppercase">
          {user.firstName
            ? user.firstName[0]
            : user.username
              ? user.username[0]
              : "?"}
        </AvatarFallback>
      </Avatar>

      <div className="flex w-full min-w-0 flex-col gap-0.5">
        <span className="truncate px-1 font-bold text-gray-900">
          {user.firstName
            ? `${user.firstName} ${user.lastName || ""}`
            : "Пользователь"}
        </span>
        <span className="truncate text-sm text-gray-500">
          @{user.username || "логин"}
        </span>
      </div>
    </Card>
  );
}
