import React from 'react'

const fontSizeMap = {
  12: "text-[12px]",
  14: "text-[14px]",
  16: "text-[16px]",
  18: "text-[18px]",
  20: "text-[20px]",
  24: "text-[24px]",
  32: "text-[32px]",
  48: "text-[48px]",
  56: "text-[56px]",
}

const fontWeightMap = {
  regular: "font-normal",
  semibold : "font-bold",
  bold: "font-bold" 
}

const colorMap = {
  primary: "text-[#251C1D]",
  secondary: "text-[#716B6C]",
  primary_on_dark: "text-white",
  placeholder: "text-[#9D9999]",
  disabled: "text-[#D3D5D7]",
  white: "text-white",
  brown: "text-[#7A5C61]",
  red: "text-[#EC0357]",
  green: "text-[#18B473]",
  pink: "text-[#CF9CA5]"
}

export default function Heading ({text, fontSize,fontWeight, color = "primary" }) {
  return (
    <div>
        <h5 className= {`${fontSizeMap[fontSize]} ${fontWeightMap[fontWeight]} ${colorMap[color]} `}>{text}</h5> 
    </div>
  )
}
