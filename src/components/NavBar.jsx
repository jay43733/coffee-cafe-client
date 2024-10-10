import React, { useState } from "react";
import SecondaryButton from "./Button/SecondaryButton";

export default function NavBar({ setSelectedCategory }) {
  const [isClicked, setIsClicked] = useState("All");

  const hdlSelectedCategory = (category) => {
    // console.log(category)
    setSelectedCategory(category);
  };

  const hdlClick = (text) => {
    setIsClicked(text);
    // console.log(e.target.value);
  };

  return (
    <div className="flex justify-around w-full">
      <div onClick={() => hdlSelectedCategory("")} className="flex-1 mx-4">
        <SecondaryButton
          isClicked={isClicked}
          func={() => hdlClick("All")}
          value="all"
          text="All"
        />
      </div>
      <div onClick={() => hdlSelectedCategory(true)} className="flex-1 mx-4">
        <SecondaryButton
          isClicked={isClicked}
          func={() => hdlClick("Recommended")}
          value="recommended"
          text="Recommended"
        />
      </div>
      <div onClick={() => hdlSelectedCategory(1)} className="flex-1 mx-4">
        <SecondaryButton
          isClicked={isClicked}
          func={() => hdlClick("Coffee")}
          value="coffee"
          text="Coffee"
        />
      </div>
      <div onClick={() => hdlSelectedCategory(2)} className="flex-1 mx-4">
        <SecondaryButton
          isClicked={isClicked}
          func={() => hdlClick("Milk / Tea")}
          value="milk"
          text="Milk / Tea"
        />
      </div>
    </div>
  );
}
