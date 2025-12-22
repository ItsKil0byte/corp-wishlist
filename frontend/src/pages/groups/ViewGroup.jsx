import React from 'react';
import Header from "../../components/Header/Header.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import TileList from "../../components/lists/TileList.jsx";
import toast from "react-hot-toast";
import WebApp from "@twa-dev/sdk";

const ViewGroup = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams()
    const group = JSON.parse(
        sessionStorage.getItem("groups")).find(group => group.id === Number(searchParams.get("id"))
    )

    const renderUserProfile = (item, index) => {
        return (
            <div key={index}
                 className={`w-full h-full flex flex-col justify-center items-center mb-6`}
                 onClick={() => {navigate(`/profile/others?id=${item.id}&from=${group.id}`)}}
            >
                <div className={`w-[6.25rem] h-[6.25rem] flex-col justify-center items-center overflow-clip mb-2 bg-gray-300 rounded-[50%]`}>
                    <img className={"w-full h-full"} alt={"аватар"} src={item.photo_url} />
                </div>
                <span>{`${item.first_name} ${item.last_name}`}</span>
            </div>
        )
    }

    const onShare = async () => {
        if (!group) return;

        const inviteLink = `https://t.me/RADpoDARky_bot/raddar?startapp=joingroup_${group.id}`;
        const messageText = `Вступай в мою группу!`;

        const link = `${messageText}\n${inviteLink}`;

        try {
            await navigator.clipboard.writeText(link);
            toast.success('Ссылка скопирована')
        } catch {
            toast.error("Не удалось поделиться");
        }
    }

    return (
        <>
            <Header hasBackButton={true}
                    hasText={true}
                    hasEditButton={true}
                    hasShareButton={true}
                    onBack={() => navigate("/groups")}
                    text={group.icon ? `${group.icon} ${group.name}` : group.name}
                    onShare={() => onShare()}
                    onEdit={() => navigate(`/groups/group/edit?id=${searchParams.get("id")}`)}/>
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll"}>
                <TileList items={group.members} render={renderUserProfile} className={"w-full max-w-[31.5rem] grid-cols-2 min-[24.375rem]:grid-cols-3"} />
            </div>
        </>
    );
};

export default ViewGroup;