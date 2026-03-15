import React, {useState} from 'react';
import {GoPencil} from "react-icons/go";
import {IoCheckmark} from "react-icons/io5";
import UserInfoService from "../services/UserInfoService.js";
import toast from "react-hot-toast";

const InfoSection = ({ title, info, placeholder, userInfo, setUserInfo, type, canBeEdited = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = React.useState(info);
    // const [loading, setLoading] = React.useState(false);

    const renderForm = () => {
        return isEditing ? (
            <textarea rows={5}
                      className={"w-full h-full text-main-theme-primary text-start p-2 outline-main-theme rounded-2xl resize-y"}
                      value={value?.toString()}
                      placeholder={placeholder}
                      onChange={e => setValue(e.target.value)}/>

        ) : (
            <span className={"w-full h-full text-main-theme-primary text-start mb-2"}>
                {info ? info : placeholder}
            </span>
        )
    }

    const renderButton = () => {
        return !isEditing
                ? <GoPencil className={`w-6 h-6 absolute top-[1.125rem] right-[1.125rem]`} onClick={onEditClick}/>
                : <IoCheckmark className={`w-6 h-6 absolute top-[1.125rem] right-[1.125rem]`} onClick={onConfirmClick} />
    }

    const onEditClick = () => {
        setIsEditing(true);
    }

    const onConfirmClick = async () => {
        setIsEditing(true);
        const tID = toast.loading("Сохранение")

        const newInfo = {
            ...userInfo,
            [type]: value
        }

        const updInfo = await UserInfoService.updateInfo(newInfo)

        setUserInfo(updInfo)
        setIsEditing(false);
        toast.success(`${title} обновлены`, {
            id: tID
        })
    }

    return (
        <div className={"w-full h-fit max-h-[35rem] flex flex-col items-center overflow-clip p-[1.125rem] bg-main-theme-lite rounded-[1.25rem] mb-8 relative"}>
            {
                canBeEdited && renderButton()
            }
            <span className={"w-full text-start text-[1.25rem] mb-2"}>
                {title}
            </span>
            { renderForm() }
        </div>
    );
};

export default InfoSection;