import React from "react";

export default function RedButton({ type, text, Icon,style, width= "w-full", ...rest }) {
  return (
    <div>
      <button
        {...rest}
        className={`bg-[#EC0357] ${style} ${width} hover:bg-[#B2004A] text-white text-lg font-semibold text-center px-4 py-2 rounded-[20px] min-w-[144px]`}
        type={type}
      >
        <div className="flex items-center justify-center gap-4">
          {Icon && <Icon />}
          {text}
        </div>
      </button>
    </div>
  );
}
