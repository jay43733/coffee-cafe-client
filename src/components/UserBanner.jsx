import React from "react";
import Heading from "./Typography/Heading";
import useUserStore from "../store/user-store";
import coffeecafe_logo from "../assets/coffeecafe-logo.svg";

export default function UserBanner() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex items-baseline gap-2 px-4 py-4 rounded-[16px] bg-[#D79E9E] text-center">
      <Heading
        text={`Hello, ${user.user.firstName}`}
        fontSize="24"
        fontWeight="bold"
        color="primary"
      />
      <img src={coffeecafe_logo} alt="logo" width="20px" />
    </div>
  );
}
