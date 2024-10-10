import React from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import ProtectRouter from "./ProtectRouter";
import OrderProduct from "../pages/OrderProduct";
import Unauthorized from "../pages/Unauthorized";
import { NotFound } from "../pages/NotFound";
import OrderLayout from "../layouts/OrderLayout"
import OrderHomePage from "../pages/OrderHomePage";
import OrderProductStatus from "../pages/OrderProductStatus";
import useUserStore from "../store/user-store";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <HomeLayout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate to = "/" /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRouter element={<OrderLayout/>} allow={["USER"]}/>,
    children: [
      { index:true, element: <ProtectRouter element={<OrderHomePage/>} allow={["USER"]} />},
      { path: "order", element: <OrderProduct /> },
      { path: "order/status", element: <OrderProductStatus /> },
      { path: "*", element: <Navigate to = "/user" /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={guestRouter} />;
};

export default AppRouter;
