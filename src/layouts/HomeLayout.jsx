import React from "react";
import Logo from "../components/Logo";
import LeftSideBar from "../components/LeftSideBar";
import Carousal from "../components/Carousal";
import HomePage from "../pages/HomePage";
import { Outlet } from "react-router-dom";
import Banner from "../components/LoginButton";

const HomeLayout = () => {
  return (
    <div className="max-w-[1844px] mx-auto">
      <div className="flex items-center justify-between">
        <Logo />
        <Banner />
      </div>
      <HomePage />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
