import React from 'react'

export default function Input({type,label,placeholder,name,value,...restProps}) {
  return (
    <div>
        <label className="flex flex-col m-1 text-base"> {label}
            <input type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            className="py-4 px-4 rounded-lg border-2 border-[rgba(145,149,154,0.56)] text-lg font-bold placeholder:font-normal hover:opacity-60 focus:border-[#7A5C61]  focus:font-bold focus:placeholder:font-normal focus:bg-[#ECF1F6]"
            {...restProps}
            />
        </label>

    </div>
  )
}
