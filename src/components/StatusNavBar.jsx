import React, { useState } from "react";
import SecondaryButton from "./Button/SecondaryButton";

export default function StatusNavBar({ setSelectedStatus, setCurrentPage, setIsClickedPage }) {
  const [isClicked, setIsClicked] = useState("All");

  const hdlSelectedStatus = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1)
    setIsClickedPage(1)
  };

  const hdlClick = (text) => {
    setIsClicked(text);
  };


  return (
    <div className="flex justify-around w-full">
      <div onClick={() => hdlSelectedStatus("")} className="flex-1 mx-4">
        <SecondaryButton
          isClicked={isClicked}
          func={() => hdlClick("All")}
          value="all"
          text="All"
        />
      </div>
      <div onClick={() => hdlSelectedStatus("PENDING")} className="flex-1 mx-4">
        <SecondaryButton
          isClicked={isClicked}
          func={() => hdlClick("Pending")}
          value="PENDING"
          text="Pending"
        />
      </div>
      <div onClick={() => hdlSelectedStatus("COMPLETED")} className="flex-1 mx-4">
        <SecondaryButton
          isClicked={isClicked}
          func={() => hdlClick("Completed")}
          value="COMPLETED"
          text="Completed"
        />
      </div>
      <div onClick={() => hdlSelectedStatus("CANCELLED")} className="flex-1 mx-4">
        <SecondaryButton
          isClicked={isClicked}
          func={() => hdlClick("Cancelled")}
          value="CANCELLED"
          text="Cancelled"
        />
      </div>
    </div>
  );
}
