import React from "react";

export default function DeleteButton({ text, func, type, ...rest }) {
  return (
    <div>
      <button
        type={type}
        {...rest}
        onClick={func}
        className={`border-2
      bg-[#EC0357] rounded-none rounded-e-2xl text-white hover:bg-[#B2004A]   
      text-[16px] w-full h-full border-none px-[10px] text-lg font-semibold text-center
           py-2  min-w-[40px]`}
      >
        {text}
      </button>
    </div>
  );
}
