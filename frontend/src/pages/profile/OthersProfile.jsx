import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import UserInfoService from "../../services/UserInfoService.js";
import Loading from "../Loading.jsx";
import Header from "../../components/navigation/Header.jsx";
import InfoSection from "../../components/InfoSection.jsx";
import FlatList from "../../components/lists/FlatList.jsx";
import WishlistService from "../../services/WishlistService.js";

const OthersProfile = () => {
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();
    const userId = searchParams.get("id");
    const groupId = searchParams.get("from");
    const [wishlists, setWishlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if(loading) {
                const loadedUser = await UserInfoService.getInfo(Number(userId));
                const userWishlist = await WishlistService.getWishlistsByUserId(userId);
                console.log(userWishlist);
                setUserInfo(loadedUser);
                setWishlists(userWishlist);
                sessionStorage.setItem("others_wishlists", JSON.stringify(userWishlist));
                setLoading(false);
            }
        }

        fetchData();
    }, [loading]);

    if (loading) {
        return <Loading message={"Загружаю профиль..."}/>;
    }

    const renderWishlist = (item, index) => {
        return (
            <li className={`w-full h-[3.75rem] px-3 flex justify-start items-center gap-2 mb-4 ${"bg-" + item.color} rounded-[0.625rem] list-none list-image-none`}
                key={index}
                onClick={() => {navigate(`/wishlists/wishlist/view/others?id=${item.id}&from=${groupId}&user=${userId}`)}}
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

    return (
        <>
            <Header hasBackButton={true} onBack={() => navigate(`/groups/group/view?id=${groupId}`)} />
            <div className={"w-full grow flex flex-col items-center overflow-y-scroll"}>
                <div className={"w-full px-9 my-4 grow flex flex-col items-center max-w-[31.5rem]"}>
                    <section id="profile" className={"w-full max-w-[17.5rem] grid grid-cols-2 max-[22.5rem]:grid-cols-1 max-[22.5rem]:grid-rows-2 gap-6 mb-8"}>
                        <div id={"avatar"} className={"w-full h-full flex justify-center items-center"}>
                            <div className={`w-[8.125rem] h-[8.125rem] flex justify-center items-center overflow-clip mb-2 bg-main-theme-lite rounded-[50%]`}>
                                {
                                    userInfo.photo_url ? (
                                        <img className={"w-full h-full object-cover"} alt={"аватар"} src={userInfo.photo_url}/>
                                    ) : (
                                        <span className="text-4xl font-bold text-main-theme uppercase">
                                        {userInfo.username?.[0] || '?'}
                                    </span>
                                    )
                                }
                            </div>
                        </div>
                        <div id={"info"} className={"h-[6rem] flex flex-col justify-around"}>
                            <div className={"w-full flex flex-col items-center"}>
                                <span className={"w-full text-start text-[1.0625rem]"}>
                                    {userInfo.first_name || ""}
                                </span>
                                <span className={"w-full text-start text-[1.0625rem]"}>
                                    {userInfo.last_name || ""}
                                </span>
                            </div>
                            <span className={"w-full text-start text-[0.8125rem]"}>
                                {userInfo.username ? `@${userInfo.username}` : ""}
                            </span>
                        </div>
                    </section>
                    <InfoSection title={"Хобби"} info={userInfo.hobbies} placeholder={"Не указано"}/>
                    <InfoSection title={"Интересы"} info={userInfo.interests} placeholder={"Не указано"}/>
                    <span className={"w-full text-start text-[1.25rem] font-semibold mb-8"}>Вишлисты</span>
                    <div className={"w-full h-77 flex flex-col items-center mb-8"}>
                        <FlatList items={wishlists} render={renderWishlist} className={"w-full h-full"} overscroll={false}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OthersProfile;