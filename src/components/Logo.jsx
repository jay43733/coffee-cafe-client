import React from "react";
import coffeecafe_logo from "../assets/coffeecafe-logo.svg";
import Heading from "./Typography/Heading";

export default function Logo() {
  return (
    <div className="flex gap-1 items-baseline my-4 ">
      <Heading
        text="Coffee Cafe"
        fontSize="48"
        fontWeight="bold"
        color="brown"
      />
      <img src={coffeecafe_logo} alt="logo" />
    </div>
  );
}
