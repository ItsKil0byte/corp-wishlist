import React from "react";

const Input = ({
  className,
  title,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div
      className={`${className} border-main-theme relative rounded-[0.875rem] border-2 px-4`}
    >
      <input
        className={"h-full w-full outline-none"}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />

      <div
        className={
          "text-main-theme absolute top-[-0.75rem] left-[1rem] flex items-center justify-center bg-white px-1 text-[0.9375rem]"
        }
      >
        {title}
      </div>
    </div>
  );
};

export default Input;
