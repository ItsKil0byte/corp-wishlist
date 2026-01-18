import React, {useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import emojiSets from "../../../data/emoji_sets.json";
import WishlistService from "../../../services/WishlistService.js";
import toast from "react-hot-toast";
import Header from "../../../components/navigation/Header.jsx";
import Input from "../../../components/inputs/Input.jsx";
import EmojiPicker from "../../../components/inputs/EmojiPicker.jsx";
import DismissButton from "../../../components/buttons/DismissButton.jsx";
import AcceptButton from "../../../components/buttons/AcceptButton.jsx";

const EditWishlist = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const wishlistId = searchParams.get("id");
    const currentWishlist = JSON.parse(sessionStorage.getItem("wishlists")).find(wishlist => wishlist.id === Number(wishlistId));
    const [emoji, setEmoji] = useState(currentWishlist.icon)
    const [wishlistName, setWishlistName] = useState(currentWishlist.name);
    const [blockButtons, setBlockButtons] = useState(false);
    const emojiSet = emojiSets.wishlist;

    console.log("---EDIT WISHLIST---")
    console.dir(currentWishlist)

    const onEmojiPicked = (pickedEmoji) => {
        setEmoji(pickedEmoji)
    }

    const onEditWishlist = async () => {
        if (!blockButtons) {
            setBlockButtons(true);
            const tId = toast.loading("Сохранение")

            try {
                const wishlist = await WishlistService.updateWishlist(wishlistId, wishlistName, currentWishlist.color, emoji)
                const localWishlists = JSON.parse(sessionStorage.getItem("wishlists"));

                const updatedWishlist = localWishlists.map(w => {
                    if (w.id === Number(wishlistId)) {
                        return wishlist;
                    }

                    return w;
                })

                sessionStorage.setItem("wishlists", JSON.stringify(updatedWishlist));
                toast.success("Изменения сохранены", { id: tId });
                navigate(`/wishlists/wishlist/view?id=${wishlistId}`)
            } catch {
                toast.error("Произошла ошибка", { id: tId });
            } finally {
                setBlockButtons(false)
            }
        }
    }

    const onDeleteWishlist = async () => {
        if (!blockButtons) {
            setBlockButtons(true);
            const tId = toast.loading("Удаление")

            try {
                await WishlistService.deleteWishlist(wishlistId);

                const localWishlists = JSON.parse(sessionStorage.getItem("wishlists"));
                const updatedWishlist = localWishlists.filter(wishlist => wishlist.id !== Number(wishlistId))

                sessionStorage.setItem("wishlists", JSON.stringify(updatedWishlist));
                toast.success("Вишлист удален", { id: tId });
                navigate(`/wishlists`)
            } catch {
                toast.error("Произошла ошибка", { id: tId });
            } finally {
                setBlockButtons(false)
            }
        }
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
                    <EmojiPicker title={"Иконка вишлиста"} emojiSet={emojiSet} initialEmoji={currentWishlist.icon} onEmojiPicked={onEmojiPicked} />
                    <div className={"w-full flex justify-around mt-auto mb-6"}>
                        <DismissButton text={"Отмена"} onClick={() => {navigate(`/wishlists/wishlist/view?id=${searchParams.get("id")}`)}} />
                        <AcceptButton text={"Сохранить"} onClick={onEditWishlist} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditWishlist;