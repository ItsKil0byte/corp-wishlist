import React from 'react';

const InfoSection = ({title, info, placeholder}) => {
    return (
        <div className={"w-full h-fit max-h-[35rem] flex flex-col items-center overflow-clip p-[1.125rem] bg-main-theme-lite rounded-[1.25rem] mb-8"}>
            <span className={"w-full text-start text-[1.25rem] mb-2"}>
                {title}
            </span>
            <span className={"w-full h-full text-main-theme-primary text-start mb-2"}>
                {info ? info : placeholder}
            </span>
        </div>
    );
};

export default InfoSection;