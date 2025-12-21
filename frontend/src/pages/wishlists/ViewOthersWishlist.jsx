import React from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import TileList from "../../components/lists/TileList.jsx";
import WishCard from "../../components/WishCard.jsx";

const ViewOthersWishlist = () => {
    const navigate = useNavigate();
    const wishlist = JSON.parse(localStorage.getItem("others_wishlist"));

    const renderWish = (item, index) => {
        return (
            <div key={index}
                 className={`w-full h-full flex flex-col justify-center items-center`}
            >
                <WishCard id={index} name={item.title} description={item.description} color={item.color} clickable={false} />
            </div>
        )
    }

    return (
        <>
            <Header hasBackButton={true}
                    hasText={true}
                    onBack={() => {
                        localStorage.removeItem("others_wishlist");
                        navigate("/wishlists")
                    }}
                    text={wishlist.icon ? `${wishlist.icon} ${wishlist.name}` : wishlist.name}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll relative px-2"}>
                <TileList items={wishlist.wishes} render={renderWish} className={"w-full max-w-[31.5rem] grid-cols-2 min-[24.375rem]:grid-cols-3 gap-2"} />
            </div>
        </>
    );
};

export default ViewOthersWishlist;