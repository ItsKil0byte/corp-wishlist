import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useOutletContext } from "react-router-dom";
import PageHeader from "@/components/navigation/PageHeader";
import { Button } from "@/components/ui/button";
import { Share2, Settings, UserPlus } from "lucide-react";
import MemberCard from "@/components/MemberCard";
import GroupModal from "@/components/modals/GroupModal";
import LinkService from "@/services/LinkService";
import GroupService from "@/services/GroupService";
import toast from "react-hot-toast";

export default function ViewGroup() {
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("id");
    const navigate = useNavigate();
    const { groups, fetchGroups } = useOutletContext();

    const [group, setGroup] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        if (!groupId) {
            navigate("/groups");
            return;
        }
        const currentGroup = groups.find((g) => g.id === Number(groupId));
        if (currentGroup) {
            setGroup(currentGroup);
        }
    }, [groupId, groups, navigate]);

    const handleShare = async () => {
        const tId = toast.loading("Генерируем ссылку...");
        try {
            const linkInfo = await LinkService.getLinkInfo("GROUP_INVITE", groupId);
            const link = `${window.location.origin}/link?start_param=${linkInfo.token}`;
            await navigator.clipboard.writeText(link);
            toast.success("Ссылка скопирована!", { id: tId });
        } catch (error) {
            toast.error("Ошибка при создании ссылки", { id: tId });
        }
    };

    const handleUpdateGroup = async (groupData) => {
        try {
            await GroupService.updateGroup(groupId, groupData.name, groupData.icon);
            await fetchGroups();
            setIsSettingsOpen(false);
            toast.success("Данные группы обновлены");
        } catch (error) {
            toast.error("Ошибка при обновлении");
            console.error(error);
        }
    };

    const handleDeleteGroup = async () => {
        if (!window.confirm("Вы уверены, что хотите удалить группу?")) return;
        try {
            await GroupService.deleteGroup(groupId);
            await fetchGroups();
            navigate("/groups");
            toast.success("Группа удалена");
        } catch (error) {
            toast.error("Ошибка при удалении");
            console.error(error);
        }
    };

    if (!group) return <div className="p-8 text-center animate-pulse">Загрузка...</div>;

    return (
        <div className="p-4">
            <PageHeader
                title={`${group.icon || "👥"} ${group.name}`}
                onBack={() => navigate("/groups")}
            >
                <Button
                    onClick={handleShare}
                    className="bg-[#02A2EC] border-2 border-[#007CD5] text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all w-full sm:w-auto"
                >
                    <Share2 className="size-5" />
                    Пригласить
                </Button>

                <Button
                    onClick={() => setIsSettingsOpen(true)}
                    className="bg-[#f5c60c] border-2 border-[#dab110] text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all w-full sm:w-auto"
                >
                    <Settings className="size-5" />
                    Настройки
                </Button>
            </PageHeader>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                {group.members.map((member) => (
                    <MemberCard key={member.userId} user={member} groupId={groupId} />
                ))}

                <div
                    onClick={handleShare}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-main-theme hover:text-main-theme transition-all cursor-pointer min-h-[160px]"
                >
                    <UserPlus className="size-8" />
                    <span className="text-xs font-bold uppercase">Добавить</span>
                </div>
            </div>

            <GroupModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onSave={handleUpdateGroup}
                onDelete={handleDeleteGroup}
                data={group}
            />
        </div>
    );
}