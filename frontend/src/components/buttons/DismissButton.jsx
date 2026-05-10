import React from "react";

const DismissButton = ({ className, text, disabled = false, onClick }) => {
  return (
    <div
      className={`bg-main-theme-lite text-main-theme rounded-[0.625rem] px-4 py-2 text-2xl ${disabled && "pointer-events-none opacity-35"} ${className}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default DismissButton;
