import { FaChevronLeft } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { IoChevronBack, IoShareSocial } from "react-icons/io5";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

function Header({
  hasBackButton,
  hasText,
  hasShareButton,
  hasEditButton,
  hasDeleteButton,
  onBack,
  text,
  onShare,
  onEdit,
  onDelete,
}) {
  return (
    <div className="my-2 flex min-h-12 w-full items-center gap-x-4 px-2">
      <div className="relative flex h-8 w-full items-center justify-center">
        <div
          className={`absolute top-0 left-0 flex h-full w-fit items-center ${!hasBackButton && "hidden"}`}
          onClick={onBack}
        >
          <IoIosArrowBack className={"fill-main-theme h-8 w-8"} />
        </div>
        <div
          className={`flex h-full w-[55%] items-center justify-center truncate font-bold text-black ${!hasText && "hidden"}`}
        >
          <span className="w-full truncate text-center">{text}</span>
        </div>
        <div
          className={`absolute top-0 flex h-full w-12 items-center justify-center ${!hasShareButton ? "right-0" : "right-10"} ${!hasEditButton && "hidden"}`}
          onClick={onEdit}
        >
          <GoPencil className={"fill-main-theme h-6 w-6"} />
        </div>
        <div
          className={`absolute top-0 right-0 flex h-full w-12 items-center justify-center ${!hasShareButton && "hidden"}`}
          onClick={onShare}
        >
          <IoShareSocial className={"fill-main-theme h-6 w-6"} />
        </div>
        <div
          className={`absolute top-0 right-0 flex h-full w-12 items-center justify-center ${!hasDeleteButton && "hidden"}`}
          onClick={onDelete}
        >
          <AiOutlineDelete className={"h-6 w-6 fill-red-500"} />
        </div>
      </div>
    </div>
  );
}

export default Header;
