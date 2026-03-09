import React, {useEffect, useState} from "react";
import FlatList from "../../components/lists/FlatList.jsx";
import GroupService from "../../services/GroupService.js";
import Loading from "../Loading.jsx";
import {useNavigate} from "react-router-dom";
import PlusButton from "../../components/buttons/PlusButton.jsx";
import Storage from "../../store/Storage.js";
import getNumeralEnding from "../../utils/getNumeralEnding.js";

function Groups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const localGroups = sessionStorage.getItem("groups");

            if (localGroups === null) {
                let data = await GroupService.getGroups();

                if (data && data.length === 0) {
                    const canCreatePlaceholderGroup = await Storage.getItem("canCreatePlaceholderGroup");

                    if (canCreatePlaceholderGroup === null) {
                        await GroupService.addGroup("Одногруппники", "🥳")
                        data = await GroupService.getGroups();
                        await Storage.setItem("canCreatePlaceholderGroup", "false");
                    }
                }

                sessionStorage.setItem("groups", JSON.stringify(data));
                setGroups(data);
            } else {
                setGroups(JSON.parse(sessionStorage.getItem("groups")));
            }

            setLoading(false);
        }

        fetchData();
    }, [loading]);

    const renderGroup = (item, index) => {
        return (
            <li className="w-full h-[3.75rem] px-3 flex justify-start items-center gap-2 mb-4 bg-main-theme-lite rounded-[0.625rem] list-none list-image-none"
                key={index}
                onClick={() => {navigate(`/groups/group/view?id=${item.id}`)}}
            >
                <div className="w-8 h-8 flex justify-center items-center text-[2rem]">
                    {item.icon}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="text-[1.1875rem] truncate">
                        {item.name}
                    </div>
                    <div className="text-[0.9375rem] truncate">
                        {item.members.length} {`участник${getNumeralEnding(item.members.length)}`}
                    </div>
                </div>
            </li>
        )
    }

    if (loading) {
        return <Loading message="Загружаю группы..." />;
    }

	return (
        <div className="w-full h-full flex px-8 pt-8 overflow-hidden relative">
            <FlatList items={groups} render={renderGroup} className={"w-full h-full"}></FlatList>
            <PlusButton className={"absolute right-5 bottom-5"}
                onClick={() => navigate("/groups/create")}/>
        </div>
    );
}

export default Groups;
