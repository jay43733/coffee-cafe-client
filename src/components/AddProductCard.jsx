import React from "react";
import chocolateDrink from "../assets/chocolate-drink.svg";
import Heading from "./Typography/Heading";
import { CirclePlus } from "lucide-react";
import PrimaryButton from "./Button/PrimaryButton";

export default function AddProductCard({ hdClickAdd }) {
  return (
    <div
      onClick={hdClickAdd}
      className="flex flex-col gap-5 bg-white outline-dashed outline-[3px] outline-[#7A5C61] rounded-3xl py-4 h-[264px] w-[196px] shadow-md hover:duration-100 hover:opacity-60 "
    >
      <div className="basis-2/3 min-w-full px-24 items-center relative justify-center">
        <div className="absolute top-0 right-2 -translate-y-1">
          <CirclePlus size={28} color="#7A5C61" />
        </div>
      </div>
      <div className="flex basis-1/3 min-w-full flex-col gap-1 text-center ">
        <div className="w-3/4 self-center py-2 px-1 cursor-pointer hover:bg-[#7a5c61] hover:rounded-2xl hover:text-white">
          <Heading
            text="Add Product"
            fontSize="20"
            fontWeight="bold"
            color="#574145"
          />
        </div>
      </div>
    </div>
  );
}
