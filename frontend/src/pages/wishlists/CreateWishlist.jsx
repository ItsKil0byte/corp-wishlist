import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistService from "../../services/WishlistService.js";
import emojiSets from "../../data/emoji_sets.json";
import toast from "react-hot-toast";
import Header from "../../components/Header/Header.jsx";
import Input from "../../components/Input.jsx";
import EmojiPicker from "../../components/EmojiPicker.jsx";
import DismissButton from "../../components/DismissButton.jsx";
import AcceptButton from "../../components/AcceptButton.jsx";

function CreateWishlist() {
    const navigate = useNavigate();
    const [emoji, setEmoji] = useState(null)
    const [wishlistName, setWishlistName] = useState("")
    const emojiSet = emojiSets.wishlist;
    const [creating, setCreating] = useState(false);

    const onEmojiPicked = (pickedEmoji) => {
        setEmoji(pickedEmoji)
    }

    const onCreateWishlist = async () => {
        if (!creating) {
            setCreating(true);
            await WishlistService.addWishlist(wishlistName, "main-theme-lite", emoji)
            sessionStorage.removeItem("wishlists");
            toast.success("Вишлист создан")
            navigate("/wishlists");
        }
    }

    return (
        <>
            <Header hasBackButton={true} onBack={() => navigate("/wishlists")}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll"}>
                <div className={"w-full px-9 my-4 grow flex flex-col gap-y-8 max-w-[31.5rem]"}>
                    <Input className={"w-full h-12"} title={"Название"} placeholder={"На новый год"} value={wishlistName} onChange={e => setWishlistName(e.target.value)}/>
                    <EmojiPicker title={"Иконка вишлиста"} emojiSet={emojiSet} onEmojiPicked={onEmojiPicked} />
                    <div className={"w-full flex justify-around mt-auto mb-6"}>
                        <DismissButton text={"Отмена"} onClick={() => {navigate("/wishlists")}} />
                        <AcceptButton text={"Создать"} onClick={onCreateWishlist} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateWishlist;