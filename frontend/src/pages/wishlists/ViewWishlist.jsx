import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import TileList from "../../components/lists/TileList.jsx";
import WishCard from "../../components/WishCard.jsx";
import PlusButton from "../../components/PlusButton.jsx";

const ViewWishlist = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams()
    const wishlist = JSON.parse(sessionStorage.getItem("wishlists")).find(wishlist => wishlist.id === Number(searchParams.get("id")))
    console.log(wishlist);

    const renderWish = (item, index) => {
        return (
            <div key={index}
                 className={`w-full h-full flex flex-col justify-center items-center`}
                 onClick={() => {navigate(`/wishlists/wish/view?id=${item.id}&from=${Number(searchParams.get("id"))}`)}}
            >
                <WishCard id={index} name={item.title} description={item.description}/>
            </div>
        )
    }

    const onShare = async () => {

    }

    return (
        <>
            <Header hasBackButton={true}
                    hasText={true}
                    hasEditButton={true}
                    hasShareButton={true}
                    onBack={() => navigate("/wishlists")}
                    text={wishlist.icon ? `${wishlist.icon} ${wishlist.name}` : wishlist.name}
                    onShare={() => onShare()}
                    onEdit={() => navigate(`/wishlists/wishlist/edit?id=${searchParams.get("id")}`)}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll relative px-2"}>
                <TileList items={wishlist.wishes} render={renderWish} className={"w-full max-w-[31.5rem] grid-cols-2 min-[24.375rem]:grid-cols-3 gap-2"} />
                <PlusButton className={"absolute right-5 bottom-5"}
                            onClick={() => navigate(`/wishlists/wish/create?id=${Number(searchParams.get("id"))}`)} />
            </div>
        </>
    );
};

export default ViewWishlist;