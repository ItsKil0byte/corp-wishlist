import React from 'react';

const Input = ({ className, title, placeholder, value, onChange }) => {
    return (
        <div className={`${className} rounded-[0.875rem] border-2 border-main-theme px-4 relative`}>
            <input className={"w-full h-full outline-none"}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange} />

            <div className={"flex justify-center items-center bg-white px-1 text-main-theme text-[0.9375rem] top-[-0.75rem] left-[1rem] absolute"}>
                {title}
            </div>
        </div>
    );
};

export default Input;