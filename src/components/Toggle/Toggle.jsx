import React, { useState } from "react";

const Toggle = ({ text, name, checked, onChange, className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={checked ? "font-semibold" : ""}>{text}</span>
      <label
        htmlFor={name}
        className={`bg-[#ECF1F6] ${
          checked ? "bg-[#d79e9e]" : ""
        } peer-checked:bg-[#A69295] w-14 h-8 rounded-full relative cursor-pointer transition-colors duration-300`}
      >
        <input
          type="checkbox"
          name={name}
          id={name}
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <span className="w-6 h-6 bg-[#C2B4B6] absolute rounded-full left-1 top-1 transition-transform duration-500 peer-checked:bg-[#7A5C61] peer-checked:translate-x-6 "></span>
      </label>
    </div>
  );
};

export default Toggle;
