import React from "react";
import Logo from "../components/Logo";
import LeftSideBar from "../components/LeftSideBar";
import Carousal from "../components/Carousal";
import HomePage from "../pages/HomePage";
import { Outlet } from "react-router-dom";
import Banner from "../components/LoginButton";

const HomeLayout = () => {
  return (
    <div className="w-full">
      <div className="flex min-w-full items-center justify-between">
        <Logo />
        <Banner />
      </div>
      <HomePage />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
