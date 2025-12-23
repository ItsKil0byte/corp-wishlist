import React from 'react';
import {FaPlus} from "react-icons/fa";

const PlusButton = ({ onClick, className }) => {
    return (
        <div className={`w-[5.625rem] h-[5.625rem] flex justify-center items-center bg-main-theme rounded-[50%] ${className}`}
             onClick={onClick}
        >
            <FaPlus className={"w-[3.375rem] h-[3.375rem] fill-main-theme-lite"}/>
        </div>
    );
};

export default PlusButton;