import React from 'react';
import {useNavigate} from "react-router-dom";
import WishCard from "../../../components/WishCard.jsx";
import Header from "../../../components/navigation/Header.jsx";
import TileList from "../../../components/lists/TileList.jsx";

const ViewSharedWishlist = () => {
    const navigate = useNavigate();
    const wishlist = JSON.parse(sessionStorage.getItem("shared_wishlist"))

    const renderWish = (item, index) => {
        return (
            <div key={index}
                 className={`w-full h-full flex flex-col justify-center items-center`}
            >
                <WishCard id={index}
                          name={item.title}
                          description={item.description}
                          color={item.color}
                          onClick={() => navigate(`/shared-wishlist-wish?id=${item.id}`)} />
            </div>
        )
    }

    if (!wishlist) {
        return (
            <>
                <Header hasBackButton={true}
                        onBack={() => {
                            navigate("/wishlists")
                        }} />
                <div className={"w-full grow flex flex-col items-center justify-center overflow-y-scroll relative px-2"}>
                    <span className={"text-4xl font-semibold"}>Не удалось загрузить вишлист...</span>
                </div>
            </>
        )
    }

    return (
        <>
            <Header hasBackButton={true}
                    hasText={true}
                    onBack={() => {
                        sessionStorage.removeItem("shared_wishlist");
                        navigate(`/wishlists`, {});
                    }}
                    text={wishlist.icon ? `${wishlist.icon} ${wishlist.title}` : wishlist.title}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll relative px-2"}>
                <TileList items={wishlist.wishes} render={renderWish} className={"w-full grid-cols-2 min-[30rem]:grid-cols-3 gap-2"} />
            </div>
        </>
    );
};

export default ViewSharedWishlist;