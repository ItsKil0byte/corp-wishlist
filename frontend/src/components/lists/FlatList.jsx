import React from 'react';

const FlatList = ({ items, render, className, overscroll = true }) => {
    return (
        <ol className={`flex-col justify-center items-center overflow-y-scroll ${className}`}>
            {
                items.map((item, index) => (
                    render(item, index)
                ))
            }
            {
                overscroll && <div className={"bg-transparent h-64"} />
            }
        </ol>
    );
};

export default FlatList;