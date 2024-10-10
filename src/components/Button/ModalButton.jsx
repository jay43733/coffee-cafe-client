import React from "react";

export default function ModalButton({
  text,
  func,
  type,
  defaultSelected,
  sweetness,
  roast,
  ...rest
}) {
  //   console.log(sweetness);
  // console.log(defaultSelected)
  // console.log(sweetness === rest.value)
  let clicked;
  if (sweetness === rest.value) {
    clicked = true;
  } else if (roast === rest.value) {
    clicked = true;
  } else {
    clicked = false;
  }

  //   console.log("click", clicked);

  return (
    <div>
      <button
        type={type}
        {...rest}
        onClick={func}
        className={`border-2 border-[#91959A] hover:duration-200 
             ${
               clicked
                 ? "bg-[#7A5C61] font-bold text-white "
                 : "bg-white font-semibold hover:bg-[#d79e9e]"
             }
        
             text-[16px] text-center px-4 py-2 w-full rounded-[20px] min-w-[40px]`}
      >
        {text}
      </button>
    </div>
  );
}
