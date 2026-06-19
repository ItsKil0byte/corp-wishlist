import React from "react";

const AcceptButton = ({ className, text, onClick, disabled = false }) => {
  return (
    <div
      className={`bg-main-theme text-main-theme-lite rounded-[0.625rem] px-4 py-2 text-2xl ${className} ${disabled && "pointer-events-none opacity-35"}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default AcceptButton;
