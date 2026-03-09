import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import Header from "../../../components/navigation/Header.jsx";

const ViewSharedWish = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const wishId = searchParams.get("id");

    const wishlist = JSON.parse(sessionStorage.getItem("shared_wishlist"))
    const wish = wishlist.wishes.find(wish => wish.id === Number(wishId))
    const color = `bg-${wish.color}`

    return (
        <div className="h-full w-full flex flex-col">
            <Header hasBackButton={true}
                    hasText={true}
                    onBack={() => {navigate(`/wishlists/wishlist/view/shared`)}}
                    text={wishlist.icon ? `${wishlist.icon} ${wishlist.title}` : wishlist.title}/>
            <div className={`p-4 mx-4 ${color} rounded-2xl flex flex-col justify-center`}>
                <span className="w-full text-center wrap-break-word font-semibold text-2xl">{wish.title}</span>
                <div className="p-4 w-full wrap-break-word font-semibold text-main-theme-primary text-center">
                    {wish.description}
                </div>
            </div>
        </div>
    );
};

export default ViewSharedWish;