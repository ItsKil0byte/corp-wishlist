import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import WishlistService from "../../services/WishlistService.js";
import Loading from "../Loading.jsx";
import FlatList from "../../components/lists/FlatList.jsx";
import PlusButton from "../../components/buttons/PlusButton.jsx";

function Wishlists() {
	const [wishlists, setWishlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlists = async () => {
            let data;
            const localWishlists = sessionStorage.getItem("wishlists");

            if (localWishlists && localWishlists.length > 0) {
                data = JSON.parse(localWishlists);
            } else {
                data = await WishlistService.getWishlists();
            }

            if (data && data.length === 0) {
                await WishlistService.addWishlist("На новый год", "main-theme-lite", "\uD83C\uDF84");
                data = await WishlistService.getWishlists();
            }

            sessionStorage.setItem("wishlists", JSON.stringify(data));
            setWishlists(data);
            setLoading(false);
        }

        fetchWishlists();
    }, []);

    const renderWishlist = (item, index) => {
        console.log(item);

        return (
            <li className={`w-full h-[3.75rem] px-3 flex justify-start items-center gap-2 mb-4 ${"bg-" + item.color} rounded-[0.625rem] list-none list-image-none`}
                key={index}
                onClick={() => {navigate(`/wishlists/wishlist/view?id=${item.id}`)}}
            >
                <div className="w-8 h-8 flex justify-center items-center text-[2rem]">
                    {item.icon}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="text-[1.1875rem] truncate">
                        {item.name}
                    </div>
                    <div className="text-[0.9375rem] truncate">
                        {item.wishes.length} {`желаний`}
                    </div>
                </div>
            </li>
        )
    }

    if (loading) {
        return <Loading message="Загружаю вишлисты..." />;
    }

	return (
        <div className="w-full h-full flex px-8 pt-8 overflow-hidden relative">
            <FlatList items={wishlists} render={renderWishlist} className={"w-full h-full"} />
            <PlusButton className={"absolute right-5 bottom-5"}
                        onClick={() => navigate("/wishlists/wishlist/create")}/>
        </div>
	);
}

export default Wishlists;
