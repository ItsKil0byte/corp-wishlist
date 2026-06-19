import React from "react";

const FlatList = ({ items, render, className, overscroll = true }) => {
  return (
    <ol className={`flex flex-col overflow-y-auto ${className}`}>
      {items.map((item, index) => render(item, index))}
      {overscroll && <div className={"h-64 bg-transparent"} />}
    </ol>
  );
};

export default FlatList;
