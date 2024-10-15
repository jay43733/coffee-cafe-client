import React from "react";

export default function PrimaryButton({ type, text, Icon, ...rest }) {
  return (
    <div>
      <button
        {...rest}
        className="bg-[#7A5C61] hover:bg-[#6E5357] text-white text-lg font-semibold text-center px-4 py-3 rounded-[20px] w-full min-w-[144px]"
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
