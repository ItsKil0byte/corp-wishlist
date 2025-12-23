import React from 'react';

const DismissButton = ({ className, text, onClick }) => {
    return (
        <div className={`px-4 py-2 bg-main-theme-lite text-2xl text-main-theme rounded-[0.625rem] ${className}`}
             onClick={onClick}>
            {text}
        </div>
    );
};

export default DismissButton;