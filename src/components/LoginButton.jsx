import React from "react";
import Heading from "./Typography/Heading";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <div>
      <Link to="/login">
        <div className="flex gap-2 py-4 px-4 rounded-[16px] hover:opacity-70 shadow-md bg-[#D79E9E] justify-center">
          <LogIn size={32} color="white" />
          <Heading
            text="Login & Order Now"
            fontSize="20"
            fontWeight="bold"
            color="white"
          />
        </div>
      </Link>
    </div>
  );
}
