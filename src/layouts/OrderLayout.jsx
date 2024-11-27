import React from "react";
import Logo from "../components/Logo";
import LeftSideBar from "../components/LeftSideBar";
import Carousal from "../components/Carousal";
import HomePage from "../pages/HomePage";
import { Outlet } from "react-router-dom";
import OrderHomePage from "../pages/OrderHomePage";
import UserBanner from "../components/UserBanner";
import UserLeftSideBar from "../components/UserLeftSideBar";
import useUserStore from "../store/user-store";

const OrderLayout = () => {
  return (
    <div className="w-full max-w-[1844px] mx-auto ">
      <div className="flex w-full items-center sticky top-0 z-10 justify-between bg-[#edf1f5]">
        <Logo />
        <UserBanner />
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="flex-[0.2] fixed">
          <UserLeftSideBar />
        </div>

        {/* Content Area */}
      </div>
        <div className="pl-[280px] min-h-full">
          <Outlet />
        </div>
    </div>
  );
};

export default OrderLayout;
