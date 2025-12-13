import React, {useEffect, useState} from "react";
import FlatList from "../../components/lists/FlatList.jsx";
import GroupService from "../../services/GroupService.js";
import Loading from "../loading/Loading.jsx";
import {useNavigate} from "react-router-dom";

function Groups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("groups") === null) {
                let data = await GroupService.getAllGroups();

                if (data && data.length === 0) {
                    const canCreatePlaceholderGroup = localStorage.getItem("canCreatePlaceholderGroup");

                    if (canCreatePlaceholderGroup === null) {
                        await GroupService.addGroup("Одногруппники")
                        data = await GroupService.getAllGroups();
                        localStorage.setItem("canCreatePlaceholderGroup", "false");
                    }
                }

                localStorage.setItem("groups", JSON.stringify(data));
                setGroups(data);
            } else {
                setGroups(JSON.parse(localStorage.getItem("groups")));
            }

            setLoading(false);
        }

        fetchData();
    }, [loading]);

    const renderGroup = (item, index) => {
        return (
            <li className="w-full h-[3.75rem] px-3 flex justify-start items-center gap-2 mb-4 bg-main-theme-lite rounded-[0.625rem] list-none list-image-none"
                key={index}
                onClick={() => {}}
            >
                <div className="w-8 h-8 flex justify-center items-center text-[2rem]">
                    {item.emoji}
                </div>
                <div className="flex-col">
                    <div className="flex justify-start items-center text-[1.1875rem]">
                        {item.name}
                    </div>
                    <div className="flex justify-start items-center text-[0.9375rem]">
                        {item.members.length} участник(ов)
                    </div>
                </div>
            </li>
        )
    }

    if (loading) {
        return <Loading message="Загружаю группы..." />;
    }

	return (
        <div className="w-full h-full flex p-8 overflow-hidden relative">
            <FlatList items={groups} render={renderGroup} className={"w-full h-full"}></FlatList>
            <button
                onClick={() => navigate("/groups/create")}
                className="bg-main-theme size-20 rounded-[50%] flex justify-center items-center absolute bottom-4 right-4"
            >
                +
            </button>
        </div>
    );
}

export default Groups;
