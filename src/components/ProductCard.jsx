import React from "react";
import chocolateDrink from "../assets/chocolate-drink.svg";
import Heading from "./Typography/Heading";

export default function ProductCard({ item }) {
  return (
    <div className="flex flex-col gap-5 bg-white rounded-3xl py-4 h-[264px] w-[196px] shadow-md hover:bg-[#d79e9e] hover:duration-200 ">
      <div className="flex items-center justify-center basis-2/3 min-w-full">
        <img
          src={item.image}
          alt="product"
          className="h-full object-contain min-w-[40px] max-w-[48px]"
        />
      </div>
      <div className="flex basis-1/3 min-w-full flex-col gap-1 text-center ">
        <Heading
          text={item.name}
          fontSize="20"
          fontWeight="bold"
          color="primary"
        />
        <Heading
          text={`${item.price} baht`}
          fontSize="18"
          fontWeight="normal"
          color="primary"
        />
      </div>
    </div>
  );
}
