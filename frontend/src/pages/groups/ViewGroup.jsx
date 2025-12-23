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

    const groupIsEmpty = group.members.length === 0

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
            <div className={"w-full grow flex flex-col items-center justify-between overflow-y-scroll relative"}>
                {
                    groupIsEmpty ? (
                        <>
                            <div className="absolute top-0 right-2 w-24 h-48 sm:w-32 sm:h-56">
                                <svg width="73" height="208" viewBox="0 0 73 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.295617 202.529C41.5004 172.029 52.9754 86.5291 66.5771 4.90671" stroke="#707579"/>
                                    <line y1="-0.5" x2="18.7404" y2="-0.5" transform="matrix(-0.2783 -0.960494 0.966332 -0.257299 72.7953 22.0293)" stroke="#707579"/>
                                    <line y1="-0.5" x2="20.3152" y2="-0.5" transform="matrix(-0.616202 0.787588 -0.811927 -0.583759 66.5366 4.0293)" stroke="#707579"/>
                                </svg>
                            </div>
                            <div className="absolute grow inset-0 flex flex-col items-center pointer-events-none">
                                <div className="text-center font-bold text-2xl text-black max-w-[300px] mt-52">
                                    <p>Группа создана!</p>
                                    <p>Самое время пригласить</p>
                                    <p>новых участников</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <TileList items={group.members} render={renderUserProfile} className={"w-full grid-cols-2 min-[30rem]:grid-cols-3"} />
                    )
                }
            </div>
        </>
    );
};

export default ViewGroup;