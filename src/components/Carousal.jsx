import React from "react";
import Heading from "./Typography/Heading";
import chocolateDrink from "../assets/chocolate-drink.svg";
import PrimaryButton from "../components/Button/PrimaryButton";

const Carousal = ({item, index}) => {

  // console.log(item.id)
  return (
    <div className="flex justify-between px-16 py-8 w-full min-w-[200px] max-w-[800px] rounded-[64px] gap-12 bg-white">
      <div className="flex flex-col gap-4 min-w-[400px]  ">
        {/* Caption */}
        <Heading
          text="Recommend"
          fontSize="24"
          fontWeight="normal"
          color="primary"
        />
        <Heading
          text={item.name}
          fontSize="48"
          fontWeight="semibold"
          color="primary"
        />
        <Heading
          text={item.description}
          fontSize="18"
          fontWeight="normal"
          color="primary_on_white"
        />
      </div>
      <div className="flex flex-col items-center max-w-[200px] min-w-[100px] p-10 gap-6">
        <img src={item.image} alt="chocolatedrink" />
        <PrimaryButton text="Order Now" />
      </div>
    </div>
  );
};

export default Carousal;
