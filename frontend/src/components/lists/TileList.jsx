import React from "react";

const TileList = ({ items, render, className, overscroll = true }) => {
  return (
    <>
      <div className={`grid overflow-y-scroll ${className}`}>
        {items.map((item, index) => render(item, index))}
        {overscroll && <div className={"col-span-full h-64 bg-transparent"} />}
      </div>
    </>
  );
};

export default TileList;
