import React from 'react';

const TileList = ({ items, render, className, overscroll = true }) => {
    return (
        <>
            <div className={`grid overflow-y-scroll ${className}`}>
                {
                    items.map((item, index) => (
                        render(item, index)
                    ))
                }
                {
                    overscroll && <div className={"bg-transparent h-64 col-span-full"} />
                }
            </div>
        </>
    );
};

export default TileList;