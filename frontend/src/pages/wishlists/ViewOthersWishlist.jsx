import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import TileList from "../../components/lists/TileList.jsx";
import WishCard from "../../components/WishCard.jsx";

const ViewOthersWishlist = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const wishlistId = searchParams.get("id");
    const groupId = searchParams.get("from");
    const userId = searchParams.get("user");

    const wishlist = JSON.parse(sessionStorage.getItem("others_wishlists")).find(w => w.id === Number(wishlistId));
    console.log(`ВИШЛИСТ ${wishlistId}`);
    console.log(wishlist);

    const renderWish = (item, index) => {
        return (
            <div key={index}
                 className={`w-full h-full flex flex-col justify-center items-center`}
            >
                <WishCard id={index}
                          name={item.title}
                          description={item.description}
                          color={item.color}
                          onClick={() => navigate(`/wishlists/wish/view/others?id=${item.id}&from=${wishlistId}&groupId=${groupId}&user=${userId}`)} />
            </div>
        )
    }

    if (!wishlist) {
        return (
            <>
                <Header hasBackButton={true}
                        onBack={() => {
                            navigate("/groups")
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
                        sessionStorage.removeItem("others_wishlist");
                        navigate(`/profile/others?id=${userId}&from=${groupId}`);
                    }}
                    text={wishlist.icon ? `${wishlist.icon} ${wishlist.name}` : wishlist.name}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll relative px-2"}>
                <TileList items={wishlist.wishes} render={renderWish} className={"w-full grid-cols-2 min-[30rem]:grid-cols-3 gap-2"} />
            </div>
        </>
    );
};

export default ViewOthersWishlist;