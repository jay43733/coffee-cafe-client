import React from "react";
import Logo from "../components/Logo";
import LeftSideBar from "../components/LeftSideBar";
import Carousal from "../components/Carousal";
import HomePage from "../pages/HomePage";
import { Outlet } from "react-router-dom";
import OrderHomePage from "../pages/OrderHomePage";
import UserBanner from "../components/UserBanner";
import UserLeftSideBar from "../components/UserLeftSideBar";

const OrderLayout = () => {
  return (
    <div className="w-full">
      <div className="flex min-w-full items-center justify-between">
        <Logo />
        <UserBanner />
      </div>

      <div className="flex w-full">
        {/* Left Sidebar */}
        <div className="flex-[0.2]">
          <UserLeftSideBar />
        </div>

        {/* Content Area */}
        <div className="flex-[0.8] pl-12 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
