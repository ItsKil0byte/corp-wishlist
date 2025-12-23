import React, {useState} from 'react';
import Header from "../../components/navigation/Header.jsx";
import Input from "../../components/inputs/Input.jsx";
import EmojiPicker from "../../components/inputs/EmojiPicker.jsx";
import DismissButton from "../../components/buttons/DismissButton.jsx";
import AcceptButton from "../../components/buttons/AcceptButton.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import emojiSets from "../../data/emoji_sets.json"
import GroupService from "../../services/GroupService.js";
import toast from "react-hot-toast";

const EditGroup = () => {
    const [searchParams, _] = useSearchParams();
    const currentGroup = JSON.parse(sessionStorage.getItem("groups")).find(group => group.id === Number(searchParams.get("id")));
    const emojiSet = emojiSets.group;
    const [groupName, setGroupName] = useState(currentGroup.name);
    const [emoji, setEmoji] = useState(currentGroup.icon);
    const navigate = useNavigate();

    const onEditGroup = async () => {
        const updatedGroup = await GroupService.updateGroup(Number(searchParams.get("id")), groupName, emoji);
        const currentGroups = JSON.parse(sessionStorage.getItem("groups"));

        const updatedGroups = currentGroups.map(group => {
            if (group.id === Number(searchParams.get("id"))) {
                return updatedGroup
            }

            return group;
        })

        sessionStorage.setItem("groups", JSON.stringify(updatedGroups));

        toast.success("Группа изменена!");
        navigate(`/groups/group/view?id=${Number(searchParams.get("id"))}`);
    }

    const onDeleteGroup = async () => {
        try {
            const status = await GroupService.deleteGroup(Number(searchParams.get("id")));
            const currentGroups = JSON.parse(sessionStorage.getItem("groups"));

            const updatedGroups = currentGroups.filter(group => group.id !== Number(searchParams.get("id")));
            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));

            if (status.toString().startsWith("2")) {
                toast.success(`Группа ${groupName} удалена`)
                navigate("/groups");
            } else {
                toast.error("При удалении произошла ошибка")
            }
        } catch {
            toast.error("При удалении произошла ошибка")
        }
    }

    return (
        <>
            <Header hasBackButton={true} onBack={() => navigate(`/groups/group/view?id=${Number(searchParams.get("id"))}`)} hasDeleteButton={true} onDelete={onDeleteGroup}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll"}>
                <div className={"w-full px-9 my-4 grow flex flex-col gap-y-8 max-w-[31.5rem]"}>
                    <Input className={"w-full h-12"} title={"Название"} placeholder={"Одногруппники"} value={groupName} onChange={e => setGroupName(e.target.value)}/>
                    <EmojiPicker title={"Иконка группы"} emojiSet={emojiSet} initialEmoji={emoji} onEmojiPicked={setEmoji} />
                    <div className={"w-full flex justify-around mt-auto mb-6"}>
                        <DismissButton text={"Отмена"} onClick={() => {navigate(`/groups/group/view?id=${Number(searchParams.get("id"))}`)}} />
                        <AcceptButton  text={"Сохранить"} onClick={onEditGroup} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditGroup;