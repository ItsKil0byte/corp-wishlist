import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/navigation/Header.jsx";
import React, { useState } from "react";
import WishService from "../../../services/WishService.js";
import getRandomItemFromArray from "../../../utils/getRandomItemFromArray.js";
import toast from "react-hot-toast";
import Input from "../../../components/inputs/Input.jsx";
import DismissButton from "../../../components/buttons/DismissButton.jsx";
import AcceptButton from "../../../components/buttons/AcceptButton.jsx";
import WishlistService from "../../../services/WishlistService.js";

function CreateWish() {
	const [searchParams, _] = useSearchParams()
	const wishlistId = searchParams.get("id")
    const [blockButtons, setBlockButtons] = useState(false);

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
    const colors = ["gift-one-lite", "gift-two-lite", "gift-profile-lite"]

	const navigate = useNavigate()

	const handleCreate = async () => {
        if (!blockButtons) {
            setBlockButtons(true);
            const tId = toast.loading("Создание")

            try {
                const wish = await WishService.addWish(wishlistId, title, description, getRandomItemFromArray(colors))
                const localWishlists = JSON.parse(sessionStorage.getItem("wishlists"));

                const updatedWishlists = localWishlists.map((wishlist) => {
                    if (wishlist.id === Number(wishlistId)) {
                        wishlist.wishes.push(wish);
                    }

                    return wishlist;
                })

                sessionStorage.setItem("wishlists", JSON.stringify(updatedWishlists));
                toast.success(`Желание добавлено`, { id: tId })
                navigate(`/wishlists/wishlist/view?id=${wishlistId}`)
            } catch {
                toast.error(`Произошла ошибка`, { id: tId })
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
                    <Input className={"w-full h-12"} title={"Заголовок"} placeholder={"Наушники"} value={title} onChange={e => setTitle(e.target.value)}/>
                    <Input className={"w-full h-12"} title={"Описание"} placeholder={"Беспроводные, синего цвета"} value={description} onChange={e => setDescription(e.target.value)}/>
                    <div className={"w-full flex justify-around mt-auto mb-6"}>
                        <DismissButton text={"Отмена"} onClick={() => {navigate(`/wishlists/wishlist/view?id=${wishlistId}`)}}/>
                        <AcceptButton text={"Создать"} onClick={handleCreate} disabled={title.length === 0 || blockButtons} />
                    </div>
                </div>
            </div>
        </>
	);
}

export default CreateWish;