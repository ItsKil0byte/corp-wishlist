import React from 'react';

const FlatList = ({ items, render, className }) => {
    return (
        <ol className={`flex-col justify-center items-center overflow-y-scroll ${className}`}>
            {
                items.map((item, index) => (
                    render(item, index)
                ))
            }
        </ol>
    );
};

export default FlatList;