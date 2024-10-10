import React from "react";
import chocolateDrink from "../assets/chocolate-drink.svg";
import Heading from "./Typography/Heading";

export default function ListMenu() {
  return (
    <div className="flex py-4 px-6 my-2 justify-between w-full h-fit bg-white ">
      <div className="flex gap-4 items-center">
        <img src={chocolateDrink} alt="chocolate drink" width="40px" />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <Heading
            text="Coffee on Ice"
            fontSize="16"
            fontWeight="bold"
            color="primary"
          />
          <Heading
            text="120 baht"
            fontSize="12"
            fontWeight="regular"
            color="primary"
          />
        </div>
        <div className="px-3 py-1 rounded-full text-center bg-[#7A5C61]">
          <Heading text="1" fontSize="16" fontWeight="bold" color="white" />
        </div>
      </div>
    </div>
  );
}
