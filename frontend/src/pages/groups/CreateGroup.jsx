import React, {useRef, useState} from 'react';
import EmojiPicker from "../../components/EmojiPicker.jsx";
import Header from "../../components/Header/Header.jsx";
import {FaAngleLeft} from "react-icons/fa6";
import {GoPencil} from "react-icons/go";
import {IoShareSocial} from "react-icons/io5";
import {FaChevronLeft} from "react-icons/fa";

const CreateGroup = () => {
    const [emoji, setEmoji] = useState(null)
    const [groupName, setGroupName] = useState("")
    const emojiSet = ["😄", "🥳", "🎮", "☕", "🎨", "🎵", "✨"]

    const onEmojiPicked = (pickedEmoji) => {
        setEmoji(pickedEmoji)
    }

    return (
        <>
            <Header haveBackButton={true}
                    haveShareButton={true}
                    haveEditButton={true} />
            <div className={"px-2 my-4 flex justify-center"}>
                <EmojiPicker title={"Иконка группы"} emojiSet={emojiSet} onEmojiPicked={onEmojiPicked} />
            </div>
        </>
    );
};

export default CreateGroup;