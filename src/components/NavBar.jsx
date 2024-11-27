import React, { useState } from "react";
import SecondaryButton from "./Button/SecondaryButton";

export default function NavBar({ setSelectedCategory, setCurrentPage, setIsClickedPage }) {
  const [isClicked, setIsClicked] = useState("All");

  const hdlSelectedCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1)
    setIsClickedPage(1)
  };

  const hdlClick = (text) => {
    setIsClicked(text);
  };

  return (
    <div className="flex justify-around px-2 w-full">
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
