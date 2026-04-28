import React, { useState } from "react";
import PageHeader from "@/components/navigation/PageHeader.jsx";
import { Button } from "@/components/ui/button.jsx";
import { UserPlus } from "lucide-react";
import GroupCard from "@/components/GroupCard.jsx";
import GroupModal from "@/components/modals/GroupModal.jsx";
import GroupService from "@/services/GroupService.js";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

export default function Groups() {
    const { groups, fetchGroups } = useOutletContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveGroup = async (groupData) => {
        const tId = toast.loading("Создание группы...");
        try {
            await GroupService.addGroup(groupData.name, groupData.icon);

            await fetchGroups();

            sessionStorage.removeItem("groups");

            toast.success("Группа успешно создана!", { id: tId });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Ошибка при создании группы:", error);
            toast.error("Не удалось создать группу", { id: tId });
        }
    };

    return (
        <div className="p-4">
            <PageHeader title="Мои группы">
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-main-theme border-2 border-main-theme-border text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all w-full sm:w-auto"
                >
                    <UserPlus className="size-5" />
                    Создать группу
                </Button>
            </PageHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {groups.map((group) => (
                    <GroupCard
                        key={group.id}
                        id={group.id}
                        name={group.name}
                        icon={group.icon}
                        memberCount={group.members.length}
                    />
                ))}
            </div>

            <GroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveGroup}
            />
        </div>
    );
}