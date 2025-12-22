import React, {useState} from 'react';
import Header from "../../components/Header/Header.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import WishService from "../../services/WishService.js";
import toast from "react-hot-toast";
import WishlistService from "../../services/WishlistService.js";
import DismissButton from "../../components/DismissButton.jsx";
import AcceptButton from "../../components/AcceptButton.jsx";

const EditWish = () => {
    const [searchParams, _] = useSearchParams()
    const navigate = useNavigate();
    const wishlist = JSON.parse(sessionStorage.getItem("wishlists")).find(wishlist => wishlist.id === Number(searchParams.get("from")))
    const wish = wishlist.wishes.find(wish => wish.id === Number(searchParams.get("id")))
    const color = `bg-${wish.color}`
    const [title, setTitle] = useState(wish.title)
    const [description, setDescription] = useState(wish.description)

    const onDelete = async () => {
        await WishService.deleteWish(wish.id)
        const updatedWishlist = await WishlistService.getWishlists()
        sessionStorage.setItem("wishlists", JSON.stringify(updatedWishlist))
        toast.success("Желание удалено")
        navigate(`/wishlists/wishlist/view?id=${Number(searchParams.get("from"))}`)
    }

    const onEditWish = async () => {
        await WishService.updateWish(wish.id, title, description, wish.color)
        const updatedWishlist = await WishlistService.getWishlists()
        sessionStorage.setItem("wishlists", JSON.stringify(updatedWishlist))
        toast.success("Изменения сохранены")
        navigate(`/wishlists/wishlist/view?id=${Number(searchParams.get("from"))}`)
    }

    return (
        <div className="h-full w-full flex flex-col justify-between">
            <Header hasBackButton={true}
                    hasText={true}
                    text={"Редактирование"}
                    onBack={() => {navigate(`/wishlists/wishlist/view?id=${Number(searchParams.get("from"))}`)}}
                    hasDeleteButton={true}
                    onDelete={onDelete}/>
            <div className={`mx-4 bg-transparent flex flex-col justify-center`}>
                <input className={`py-2 px-3 w-full h-fit ${color} text-center wrap-break-word font-semibold text-2xl rounded-2xl mb-4 outline-none`}
                       value={title}
                       onChange={e => setTitle(e.target.value)}/>
                <textarea className={`p-2 w-full h-[9rem] ${color} wrap-break-word font-semibold text-main-theme-primary text-center outline-none rounded-2xl`}
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                >
                    {wish.description}
                </textarea>
            </div>
            <div className={"w-full flex justify-around mt-auto mb-6"}>
                <DismissButton text={"Отменить"} onClick={() => {navigate(`/wishlists/wish/view?id=${Number(searchParams.get("id"))}&from=${Number(searchParams.get("from"))}`)}} />
                <AcceptButton  text={"Изменить"} onClick={onEditWish} />
            </div>
        </div>
    );
};

export default EditWish;