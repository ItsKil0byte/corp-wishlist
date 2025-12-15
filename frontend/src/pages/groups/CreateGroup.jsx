import React, {useState} from 'react';
import EmojiPicker from "../../components/EmojiPicker.jsx";
import Header from "../../components/Header/Header.jsx";
import {useNavigate} from "react-router-dom";
import Input from "../../components/Input.jsx";
import AcceptButton from "../../components/AcceptButton.jsx";
import DismissButton from "../../components/DismissButton.jsx";
import GroupService from "../../services/GroupService.js";
import toast from "react-hot-toast";

const CreateGroup = () => {
    const navigate = useNavigate();
    const [emoji, setEmoji] = useState(null)
    const [groupName, setGroupName] = useState("")
    const emojiSet = ["😄", "🥳", "🎮", "☕", "🎨", "🎵", "✨"]
    const [creating, setCreating] = useState(false);

    const onEmojiPicked = (pickedEmoji) => {
        setEmoji(pickedEmoji)
    }

    const onCreateGroup = async () => {
        if (!creating) {
            setCreating(true);
            await GroupService.addGroup(groupName, emoji)
            sessionStorage.removeItem("groups")
            toast.success("Группа создана")
            navigate("/groups")
        }
    }

    return (
        <>
            <Header hasBackButton={true} onBack={() => navigate("/groups")}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll"}>
                <div className={"w-full px-9 my-4 grow flex flex-col gap-y-8 max-w-[31.5rem]"}>
                    <Input className={"w-full h-12"} title={"Название"} placeholder={"Одногруппники"} value={groupName} onChange={e => setGroupName(e.target.value)}/>
                    <EmojiPicker title={"Иконка группы"} emojiSet={emojiSet} onEmojiPicked={onEmojiPicked} />
                    <div className={"w-full flex justify-around mt-auto mb-6"}>
                        <DismissButton text={"Отменить"} onClick={() => {navigate("/groups")}} />
                        <AcceptButton  text={"Создать"} onClick={onCreateGroup} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateGroup;