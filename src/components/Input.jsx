import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

export default function Input({
  type = "text",
  label,
  placeholder,
  name,
  value,
  ...restProps
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        className={`flex flex-col m-1 text-base ${
          type === "password" && "relative"
        }`}
      >
        {label}
        <input
          type={(type === "password") && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          name={name}
          value={value}
          className="py-4 px-4 rounded-lg border-2 border-[rgba(145,149,154,0.56)] text-lg font-bold placeholder:font-normal hover:opacity-60 focus:border-[#7A5C61]  focus:font-bold focus:placeholder:font-normal focus:bg-[#ECF1F6] disabled:bg-[#ECF1F6] disabled:border-[#D3D5D7] disabled:text-[#9D9999] disabled:hover:bg-[#ECF1F6]"
          {...restProps}
        />
        {type === "password" && (
          <>
            {!showPassword ? (
              <EyeOffIcon
                onClick={() => setShowPassword(true)}
                className="absolute top-1/2 right-4 w-6 h-6 text-[#716B6C] hover:text-[#232C35] transition-colors duration-200"
              />
            ) : (
              <EyeIcon
                onClick={() => setShowPassword(false)}
                className="absolute top-1/2 right-4 w-6 h-6 text-[#716B6C] hover:text-[#232C35] transition-colors duration-200"
              />
            )}
          </>
        )}
      </label>
    </div>
  );
}
