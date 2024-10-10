import React from "react";
import Heading from "./Typography/Heading";
import ListMenu from "./ListMenu";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";

export default function RightSideBar() {
  return (
    <div className="px-8 py-10 flex flex-col bg-white rounded-2xl min-h-[90vh] max-w-[540px] min-w-[400px]  justify-between">
      <div className="my-2 flew-grow">
        <div className="flex flex-col gap-6">
          <Heading
            text="Order 000"
            fontSize="32"
            fontWeight="bold"
            color="disabled"
          />
          <Heading
            text="Menu"
            fontSize="18"
            fontWeight="regular"
            color="disabled"
          />
        </div>
        {/* <ListMenu /> */}
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <Heading
            text="Total Price"
            fontSize="18"
            fontWeight="regular"
            color="disabled"
          />
          <div className="flex justify-end">
            <Heading
              text="-"
              fontSize="24"
              fontWeight="bold"
              color="disabled"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* <PrimaryButton text="Confirm" />
          <SecondaryButton text="Cancel" /> */}
        </div>
      </div>
    </div>
  );
}
