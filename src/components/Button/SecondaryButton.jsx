import React from "react";

export default function SecondaryButton({
  text,
  func,
  type,
  isClicked,
  color,
  Icon,
  ...rest
}) {

  return (
    <div>
      <button
        type={type}
        {...rest}
        onClick={func}
        className={`border-2
      ${
        isClicked == text
          ? "bg-[#7A5C61] duration-300 text-white font-bold"
          : "bg-white hover:bg-[#ECF1F6]"
      }
           text-[16px] ${color} text-lg font-semibold text-center
           px-4 py-2 w-full rounded-[20px] min-w-[40px]`}
      >
        <div className="flex items-center justify-center gap-4">
          {Icon && <Icon />}
          {text}
        </div>
      </button>
    </div>
  );
}
