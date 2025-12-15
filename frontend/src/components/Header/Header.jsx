import {FaChevronLeft} from "react-icons/fa";
import {GoPencil} from "react-icons/go";
import {IoShareSocial} from "react-icons/io5";
import React from "react";

function Header({ hasBackButton, hasText, hasShareButton, hasEditButton, onBack, text, onShare, onEdit }) {
	return (
		<div className="w-full min-h-12 px-2 my-2 gap-x-4 flex items-center">
            <div className="w-full h-8 flex justify-center items-center relative">
                <div className={`w-fit h-full flex items-center absolute top-0 left-0 ${!hasBackButton && "hidden"}`}
                     onClick={onBack}
                >
                    <FaChevronLeft className={"w-6 h-6 fill-main-theme"}/>
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
            </div>
		</div>
	);
}

export default Header;