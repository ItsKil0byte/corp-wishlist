import React from 'react';

const DismissButton = ({ className, text, disabled = false, onClick }) => {
    return (
        <div className={`px-4 py-2 bg-main-theme-lite text-2xl text-main-theme rounded-[0.625rem] ${disabled && "pointer-events-none opacity-35"} ${className}`}
             onClick={onClick}>
            {text}
        </div>
    );
};

export default DismissButton;