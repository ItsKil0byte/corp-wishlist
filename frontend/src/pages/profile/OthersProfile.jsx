import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import UserInfoService from "../../services/UserInfoService.js";
import Loading from "../loading/Loading.jsx";
import Header from "../../components/Header/Header.jsx";
import InfoSection from "../../components/InfoSection.jsx";

const OthersProfile = () => {
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();
    const userId = searchParams.get("id");
    const groupId = searchParams.get("from");
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if(loading) {
                const loadedUser = await UserInfoService.getInfo(Number(userId));
                setUserInfo(loadedUser);
                setLoading(false);
            }
        }

        fetchData();
    }, [loading]);

    if (loading) {
        return <Loading message={"Загружаю профиль..."}/>;
    }

    return (
        <>
            <Header hasBackButton={true} onBack={() => navigate(`/groups/group/view?id=${groupId}`)} />
            <div className={"w-full grow flex flex-col items-center overflow-y-scroll"}>
                <div className={"w-full px-9 my-4 grow flex flex-col items-center max-w-[31.5rem]"}>
                    <section id="profile" className={"w-full max-w-[17.5rem] grid grid-cols-2 max-[22.5rem]:grid-cols-1 max-[22.5rem]:grid-rows-2 gap-6 mb-8"}>
                        <div id={"avatar"} className={"w-full h-full flex justify-center items-center"}>
                            <div className={`w-[8.125rem] h-[8.125rem] flex-col justify-center items-center overflow-clip mb-2 bg-gray-300 rounded-[50%]`}>
                                <img className={"w-full h-full"} alt={"аватар"} src={userInfo.photo_url} />
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
                </div>
            </div>
        </>
    );
};

export default OthersProfile;