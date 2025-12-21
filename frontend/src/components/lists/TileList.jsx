import React from 'react';

const TileList = ({ items, render, className }) => {
    return (
        <div className={`grid overflow-y-scroll ${className}`}>
            {
                items.map((item, index) => (
                    render(item, index)
                ))
            }
            <div className={"bg-transparent h-64"} />
        </div>
    );
};

export default TileList;