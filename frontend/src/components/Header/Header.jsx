import {FaChevronLeft} from "react-icons/fa";
import {GoPencil} from "react-icons/go";
import {IoChevronBack, IoShareSocial} from "react-icons/io5";
import React from "react";
import {AiOutlineDelete} from "react-icons/ai";

function Header({ hasBackButton, hasText, hasShareButton, hasEditButton, hasDeleteButton, onBack, text, onShare, onEdit, onDelete }) {
	return (
		<div className="w-full min-h-12 px-2 my-2 gap-x-4 flex items-center">
            <div className="w-full h-8 flex justify-center items-center relative">
                <div className={`w-fit h-full flex items-center absolute top-0 left-0 ${!hasBackButton && "hidden"}`}
                     onClick={onBack}
                >
                    <IoChevronBack className={"w-6 h-6 fill-main-theme"}/>
                </div>
                <div className={`w-[60%] h-full flex justify-center items-center text-black font-bold truncate ${!hasText && "hidden"}`}>
                    <span className="truncate w-full text-center">
                        {text}
                    </span>
                </div>
                <div className={`w-12 h-full flex justify-center items-center absolute top-0 right-8 ${!hasEditButton && "hidden"}`}
                     onClick={onEdit}
                >
                    <GoPencil className={"w-6 h-6 fill-main-theme"}/>
                </div>
                <div className={`w-12 h-full flex justify-center items-center absolute top-0 right-0 ${!hasShareButton && "hidden"}`}
                     onClick={onShare}
                >
                    <IoShareSocial className={"w-6 h-6 fill-main-theme"}/>
                </div>
                <div className={`w-12 h-full flex justify-center items-center absolute top-0 right-0 ${!hasDeleteButton && "hidden"}`}
                     onClick={onDelete}
                >
                    <AiOutlineDelete className={"w-6 h-6 fill-red-500"}/>
                </div>
            </div>
		</div>
	);
}

export default Header;