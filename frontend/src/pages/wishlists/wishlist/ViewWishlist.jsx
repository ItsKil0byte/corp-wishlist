import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import Header from "../../../components/navigation/Header.jsx";
import TileList from "../../../components/lists/TileList.jsx";
import WishCard from "../../../components/WishCard.jsx";
import PlusButton from "../../../components/buttons/PlusButton.jsx";
import LinkService from "../../../services/LinkService.js";
import toast from "react-hot-toast";

const ViewWishlist = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams()
    const wishlist = JSON.parse(sessionStorage.getItem("wishlists"))?.find(wishlist => wishlist.id === Number(searchParams.get("id")))

    const wishesIsEmpty = wishlist.wishes.length === 0;

    const renderWish = (item, index) => {
        return (
            <div key={index}
                 className={`w-full h-full flex flex-col justify-center items-center`}
                 onClick={() => {navigate(`/wishlists/wish/view?id=${item.id}&from=${Number(searchParams.get("id"))}`)}}
            >
                <WishCard id={index} name={item.title} description={item.description} color={item.color}/>
            </div>
        )
    }

    const onShare = async () => {
        const linkInfo = await LinkService.getLinkInfo("WISHLIST_SHARE", searchParams.get("id"));

        const origin = window.location.origin;
        const link = `${origin}/link?start_param=${linkInfo.token}`;

        await navigator.clipboard.writeText(link);
        toast.success("Ссылка скопирована");
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
                {
                    wishesIsEmpty ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-center font-bold text-2xl text-black max-w-[300px] -mt-20">
                                <p>Вишлист создан!</p>
                                <p>Самое время наполнить</p>
                                <p>его желаниями</p>
                            </div>
                            <div className="absolute bottom-10 right-30 flex flex-col items-center">
                                <div className="text-center font-bold text-2xl text-main-theme-primary leading-tight mb-0 mr-12">
                                    <p>Добавить</p>
                                    <p>желание</p>
                                </div>
                                <svg width="127" height="50" viewBox="0 0 127 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-4">
                                    <path d="M0.498222 0.0411386C4.99805 54.5412 70.498 56.0412 125.998 35.0415" stroke="#707579"/>
                                    <line x1="125.455" y1="35.0393" x2="102.455" y2="33.0393" stroke="#707579"/>
                                    <line x1="125.852" y1="34.8948" x2="111.852" y2="48.8948" stroke="#707579"/>
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <TileList items={wishlist.wishes} render={renderWish} className={"w-full grid-cols-2 min-[30rem]:grid-cols-3 gap-2"} />
                    )
                }
                <PlusButton className={"absolute right-5 bottom-5"}
                            onClick={() => navigate(`/wishlists/wish/create?id=${Number(searchParams.get("id"))}`)} />
            </div>
        </>
    );
};

export default ViewWishlist;