import React, {useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import emojiSets from "../../data/emoji_sets.json";
import WishlistService from "../../services/WishlistService.js";
import toast from "react-hot-toast";
import Header from "../../components/Header/Header.jsx";
import Input from "../../components/Input.jsx";
import EmojiPicker from "../../components/EmojiPicker.jsx";
import DismissButton from "../../components/DismissButton.jsx";
import AcceptButton from "../../components/AcceptButton.jsx";

const EditWishlist = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const wishlistId = searchParams.get("id");
    const wishlist = JSON.parse(sessionStorage.getItem("wishlists")).find(wishlist => wishlist.id === Number(searchParams.get("id")))
    const [emoji, setEmoji] = useState(wishlist.icon)
    const [wishlistName, setWishlistName] = useState(wishlist.name);
    const emojiSet = emojiSets.wishlist;

    console.log("---EDIT WISHLIST---")
    console.dir(wishlist)

    const onEmojiPicked = (pickedEmoji) => {
        setEmoji(pickedEmoji)
    }

    const onEditWishlist = async () => {
        await WishlistService.updateWishlist(wishlistId, wishlistName, wishlist.color, emoji)
        const updatedWishlist = await WishlistService.getWishlists();
        sessionStorage.setItem("wishlists", JSON.stringify(updatedWishlist));
        toast.success("Изменения сохранены");
        navigate(`/wishlists/wishlist/view?id=${searchParams.get("id")}`)
    }

    const onDeleteWishlist = async () => {
        await WishlistService.deleteWishlist(wishlistId);
        const updatedWishlist = await WishlistService.getWishlists();
        sessionStorage.setItem("wishlists", JSON.stringify(updatedWishlist));
        toast.success("Вишлист удален");
        navigate(`/wishlists`)
    }

    return (
        <>
            <Header hasBackButton={true}
                    hasText={true}
                    text={"Редактирование"}
                    hasDeleteButton={true}
                    onBack={() => navigate(`/wishlists/wishlist/view?id=${searchParams.get("id")}`)}
                    onDelete={onDeleteWishlist}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll"}>
                <div className={"w-full px-9 my-4 grow flex flex-col gap-y-8 max-w-[31.5rem]"}>
                    <Input className={"w-full h-12"} title={"Название"} placeholder={"На новый год"} value={wishlistName} onChange={e => setWishlistName(e.target.value)}/>
                    <EmojiPicker title={"Иконка вишлиста"} emojiSet={emojiSet} initialEmoji={wishlist.icon} onEmojiPicked={onEmojiPicked} />
                    <div className={"w-full flex justify-around mt-auto mb-6"}>
                        <DismissButton text={"Отменить"} onClick={() => {navigate(`/wishlists/wishlist/view?id=${searchParams.get("id")}`)}} />
                        <AcceptButton text={"Сохранить"} onClick={onEditWishlist} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditWishlist;