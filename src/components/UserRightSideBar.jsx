import React from "react";
import Heading from "./Typography/Heading";
import ListMenu from "./ListMenu";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";

export default function UserRightSideBar() {

  
  return (
    <div className="px-8 py-10 flex flex-col bg-white rounded-2xl w-full min-h-[90vh] max-w-[540px] min-w-[400px] h-full justify-between">
      <div className="my-2 flew-grow">
        <div className="flex flex-col gap-6">
          <Heading
            text="Order 001"
            fontSize="32"
            fontWeight="bold"
            color="Primary"
          />
          <Heading
            text="Menu"
            fontSize="18"
            fontWeight="regular"
            color="primary"
          />
        </div>
        <ListMenu />
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <Heading
            text="Total Price"
            fontSize="18"
            fontWeight="regular"
            color="primary"
          />
          <div className="flex justify-end">
            <Heading
              text="120 baht"
              fontSize="24"
              fontWeight="bold"
              color="primary"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <PrimaryButton text="Confirm" />
          <SecondaryButton text="Cancel" />
        </div>
      </div>
    </div>
  );
}
