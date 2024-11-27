import React from "react";

const LoadingRightSideBar = () => {
  return (
    <div
      className="h-full max-h-[828px]
        opacity-40 relative"
    >
      <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4 z-40 opacity-100"></span>
      <div className="sticky top-4 z-10 px-8 py-10 flex flex-col bg-white rounded-2xl w-full h-full max-w-[400px] min-w-[364px] justify-between shadow-md"></div>
    </div>
  );
};

export default LoadingRightSideBar;
