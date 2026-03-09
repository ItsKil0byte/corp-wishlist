import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import Header from "../../../components/navigation/Header.jsx";

const ViewOthersWish = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const wishId = searchParams.get("id");
    const wishlistId = searchParams.get("from");
    const groupId = searchParams.get("groupId");
    const userId = searchParams.get("user");

    const wishlist = JSON.parse(sessionStorage.getItem("others_wishlists")).find(wishlist => wishlist.id === Number(searchParams.get("from")))
    const wish = wishlist.wishes.find(wish => wish.id === Number(wishId))
    const color = `bg-${wish.color}`

    return (
        <div className="h-full w-full flex flex-col">
            <Header hasBackButton={true}
                    onBack={() => {navigate(`/wishlists/wishlist/view/others?id=${wishlistId}&from=${groupId}&user=${userId}`)}} />
            <div className={`p-4 mx-4 ${color} rounded-2xl flex flex-col justify-center`}>
                <span className="w-full text-center wrap-break-word font-semibold text-2xl">{wish.title}</span>
                <div className="p-4 w-full wrap-break-word font-semibold text-main-theme-primary text-center">
                    {wish.description}
                </div>
            </div>
        </div>
    );
};

export default ViewOthersWish;