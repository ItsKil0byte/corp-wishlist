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
          className="bg-main-theme border-main-theme-border h-12 w-full border-2 px-4 text-base font-bold text-gray-900 transition-all hover:scale-105 hover:brightness-95 sm:w-auto"
        >
          <UserPlus className="size-5" />
          Создать группу
        </Button>
      </PageHeader>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            id={group.id}
            name={group.name}
            icon={group.icon}
            members={group.members}
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
