import React from 'react';

const FlatList = ({ items, render, className, overscroll = true }) => {
    return (
        <ol className={`flex flex-col overflow-y-auto ${className}`}>
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