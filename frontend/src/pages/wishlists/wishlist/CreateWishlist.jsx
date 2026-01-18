import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistService from "../../../services/WishlistService.js";
import emojiSets from "../../../data/emoji_sets.json";
import toast from "react-hot-toast";
import Header from "../../../components/navigation/Header.jsx";
import Input from "../../../components/inputs/Input.jsx";
import EmojiPicker from "../../../components/inputs/EmojiPicker.jsx";
import DismissButton from "../../../components/buttons/DismissButton.jsx";
import AcceptButton from "../../../components/buttons/AcceptButton.jsx";

function CreateWishlist() {
    const navigate = useNavigate();
    const [emoji, setEmoji] = useState(null)
    const [wishlistName, setWishlistName] = useState("")
    const emojiSet = emojiSets.wishlist;
    const [blockButtons, setBlockButtons] = useState(false);

    const onEmojiPicked = (pickedEmoji) => {
        setEmoji(pickedEmoji)
    }

    const onCreateWishlist = async () => {
        if (!blockButtons) {
            setBlockButtons(true);
            const tId = toast.loading("Создание")

            try {
                const wishlist = await WishlistService.addWishlist(wishlistName, "main-theme-lite", emoji)
                const localWishlists = JSON.parse(sessionStorage.getItem("wishlists"));

                console.dir(wishlist);
                console.dir(localWishlists);

                localWishlists.push(wishlist);
                sessionStorage.setItem("wishlists", JSON.stringify(localWishlists));

                toast.success("Вишлист создан", { id: tId });
                navigate("/wishlists");
            } catch {
                toast.error("Произошла ошибка", { id: tId });
            } finally {
                setBlockButtons(false);
            }
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
                        <AcceptButton text={"Создать"} onClick={onCreateWishlist} disabled={wishlistName.length === 0 || blockButtons} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateWishlist;