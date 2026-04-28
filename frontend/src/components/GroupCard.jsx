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
            className="p-5 bg-white border-2 border-gray-200 flex flex-col gap-6 cursor-pointer transition-all rounded-xl hover:shadow-md group"
        >
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-12 rounded-lg bg-main-theme-lite border-2 border-main-theme-lite-border text-xl shrink-0">
                    {icon || "👥"}
                </div>
                <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>
            </div>

            <div className="flex items-center min-h-[40px]">
                <div className="flex -space-x-3 overflow-hidden">
                    {displayMembers.map((member) => (
                        <Avatar key={member.userId} className="inline-block border-2 border-white size-10">
                            <AvatarImage src={member.photo_url} />
                            <AvatarFallback className="bg-main-theme-lite text-xs uppercase font-bold text-main-theme">
                                {member.firstName ? member.firstName[0] : (member.username ? member.username[0] : "?")}
                            </AvatarFallback>
                        </Avatar>
                    ))}

                    {remaining > 0 && (
                        <div className="flex items-center justify-center size-10 rounded-full bg-gray-100 border-2 border-white text-xs font-bold text-gray-600 z-10">
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
                className="w-full border-2 border-[#02A2EC] text-[#02A2EC] hover:bg-[#02A2EC] hover:text-white font-bold transition-all gap-2 h-11"
            >
                <UserPlus className="size-4" />
                Пригласить
            </Button>
        </Card>
    );
}