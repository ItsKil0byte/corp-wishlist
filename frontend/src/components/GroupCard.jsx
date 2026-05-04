import { UserPlus } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import LinkService from "@/services/LinkService";
import toast from "react-hot-toast";

export default function GroupCard({ id, name, icon, members = [] }) {
  const navigate = useNavigate();
  const maxDisplayAvatars = 4;
  const displayMembers = members.slice(0, maxDisplayAvatars);
  const remaining = members.length - maxDisplayAvatars;

  const handleShare = async (e) => {
    e.stopPropagation();
    const tId = toast.loading("Генерируем ссылку...");
    try {
      const linkInfo = await LinkService.getLinkInfo("GROUP_INVITE", id);
      const origin = window.location.origin;
      const link = `${origin}/link?start_param=${linkInfo.token}`;
      await navigator.clipboard.writeText(link);
      toast.success("Ссылка скопирована!", { id: tId });
    } catch (error) {
      toast.error("Ошибка при создании ссылки", { id: tId });
      console.error(error);
    }
  };

  return (
    <Card
      onClick={() => navigate(`/groups/group/view?id=${id}`)}
      className="group flex cursor-pointer flex-col gap-6 rounded-xl border-2 border-gray-200 bg-white p-5 transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="bg-main-theme-lite border-main-theme-lite-border flex size-12 shrink-0 items-center justify-center rounded-lg border-2 text-xl">
          {icon || "👥"}
        </div>
        <h3 className="truncate text-lg font-bold text-gray-900">{name}</h3>
      </div>

      <div className="flex min-h-[40px] items-center">
        <div className="flex -space-x-3 overflow-hidden">
          {displayMembers.map((member) => (
            <Avatar
              key={member.userId}
              className="inline-block size-10 border-2 border-white"
            >
              <AvatarImage src={member.photo_url} />
              <AvatarFallback className="bg-main-theme-lite text-main-theme text-xs font-bold uppercase">
                {member.firstName
                  ? member.firstName[0]
                  : member.username
                    ? member.username[0]
                    : "?"}
              </AvatarFallback>
            </Avatar>
          ))}

          {remaining > 0 && (
            <div className="z-10 flex size-10 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-bold text-gray-600">
              +{remaining}
            </div>
          )}
        </div>

        {members.length === 0 && (
          <span className="text-sm text-gray-400 italic">Нет участников</span>
        )}
      </div>

      <Button
        onClick={handleShare}
        variant="outline"
        className="h-11 w-full gap-2 border-2 border-[#02A2EC] font-bold text-[#02A2EC] transition-all hover:bg-[#02A2EC] hover:text-white"
      >
        <UserPlus className="size-4" />
        Пригласить
      </Button>
    </Card>
  );
}
