import React from "react";
import chocolateDrink from "../assets/chocolate-drink.svg";
import Heading from "./Typography/Heading";

export default function ProductCard({ item }) {
  return (
    <div className="flex flex-col gap-5 bg-white rounded-3xl py-4 h-[320px] w-[264px] shadow-md hover:bg-[#d79e9e] hover:duration-200 ">
      <div className="basis-2/3 min-w-full px-24 items-center justify-center">
        <img
          src={item.image}
          alt="product"
          className="w-[80px] h-full object-contain"
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
