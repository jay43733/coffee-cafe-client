import React from "react";

export default function PrimaryButton({ type, text, Icon, isEmpty, ...rest }) {
  // const isEmpty = Object.values(form).length < 4 ? false : true


  // console.log(isEmpty, "Empty")
  return (
    <div>
      <button
        disabled={isEmpty}
        {...rest}
        className={`bg-[#7A5C61] hover:bg-[#37292C] hover:duration-200 text-white text-lg font-semibold text-center px-4 py-3 rounded-[20px] w-full min-w-[144px] ${
          isEmpty ? "bg-slate-500" : "bg-[#7A5C61]"
        }`}
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
