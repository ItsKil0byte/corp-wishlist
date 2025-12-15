import React from 'react';

const AcceptButton = ({ className, text, onClick, disabled = false }) => {
    return (
        <div className={`px-4 py-2 bg-main-theme text-2xl text-main-theme-lite rounded-[0.625rem] ${className} ${disabled && "pointer-events-none opacity-35"}`}
             onClick={onClick}>
            {text}
        </div>
    );
};

export default AcceptButton;