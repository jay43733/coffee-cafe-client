import React, { useState } from "react";
import useUserStore from "../store/user-store";
import Heading from "./Typography/Heading";
import success from "../assets/check.png"

const ChangeRole = ({role}) => {
  const currentUser = useUserStore((state) => state.currentUser);

  return (
    <div className="flex flex-col gap-2 p-4 justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Heading
          text={`${currentUser.firstName} ${currentUser.lastName}`}
          color="brown"
          fontSize="18"
          fontWeight="bold"
        />
        <Heading
          text="changed to"
          color="secondary"
          fontSize="18"
          fontWeight="semiBold"
        />
        <Heading
          text={`${role}`}
          color="green"
          fontSize="32"
          fontWeight="bold"
        />
      </div>
        <img src={success} width="140px" />
    </div>
  );
};

export default ChangeRole;
