import React from "react";
import { FaPlus } from "react-icons/fa";

const PlusButton = ({ onClick, className }) => {
  return (
    <div
      className={`bg-main-theme flex h-[5.625rem] w-[5.625rem] items-center justify-center rounded-[50%] ${className}`}
      onClick={onClick}
    >
      <FaPlus className={"fill-main-theme-lite h-[3.375rem] w-[3.375rem]"} />
    </div>
  );
};

export default PlusButton;
