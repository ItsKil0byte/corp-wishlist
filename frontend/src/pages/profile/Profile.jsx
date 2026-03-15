import React, {useEffect, useState} from 'react';
import InfoSection from "../../components/InfoSection.jsx";
import WebApp from "@twa-dev/sdk";
import UserInfoService from "../../services/UserInfoService.js";
import Loading from "../Loading.jsx";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if(loading) {
                const loadedUser = await UserInfoService.getCurrentUserInfo();
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
                                {userInfo.firstName || ""}
                            </span>
                            <span className={"w-full text-start text-[1.0625rem]"}>
                                {userInfo.lastName || ""}
                            </span>
                        </div>
                        <span className={"w-full text-start text-[0.8125rem]"}>
                            {userInfo.username ? `@${userInfo.username}` : ""}
                        </span>
                    </div>
                </section>
                <InfoSection title={"Хобби"}
                             info={userInfo.hobbies}
                             placeholder={"Не указано"}
                             canBeEdited={true}
                             userInfo={userInfo}
                             setUserInfo={setUserInfo}
                             type={'hobbies'}/>

                <InfoSection title={"Интересы"}
                             info={userInfo.interests}
                             placeholder={"Не указано"}
                             canBeEdited={true}
                             userInfo={userInfo}
                             setUserInfo={setUserInfo}
                             type={'interests'}/>
            </div>
        </div>
    );
};

export default Profile;