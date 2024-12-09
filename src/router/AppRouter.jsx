import React from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import ProtectRouter from "./ProtectRouter";
import OrderProduct from "../pages/OrderProduct";
import Unauthorized from "../pages/Unauthorized";
import { NotFound } from "../pages/NotFound";
import OrderLayout from "../layouts/OrderLayout";
import OrderHomePage from "../pages/OrderHomePage";
import OrderProductStatus from "../pages/OrderProductStatus";
import useUserStore from "../store/user-store";
import UserProfile from "../pages/UserProfile";
import ProductManagement from "../pages/ProductManagement";
import UserManagement from "../pages/UserManagement";
import AdminProductStatus from "../pages/AdminProductStatus";
import Payment from "@/pages/Payment";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <HomeLayout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectRouter
        element={<OrderLayout />}
        allow={["USER", "ADMIN", "SUPERADMIN"]}
      />
    ), // Protect the parent route
    children: [
      {
        index: true,
        element: (
          <ProtectRouter
            element={<OrderHomePage />}
            allow={["USER", "ADMIN", "SUPERADMIN"]}
          />
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectRouter
            element={<UserProfile />}
            allow={["USER", "ADMIN", "SUPERADMIN"]}
          />
        ),
      },
      {
        path: "order",
        element: (
          <ProtectRouter
            element={<OrderProduct />}
            allow={["USER", "ADMIN", "SUPERADMIN"]}
          />
        ),
      },
      {
        path: "order/payment",
        element: (
          <ProtectRouter
            element={<Payment />}
            allow={["USER", "ADMIN", "SUPERADMIN"]}
          />
        ),
      },
      {
        path: "order/status",
        element: (
          <ProtectRouter element={<OrderProductStatus />} allow={["USER"]} />
        ),
      },
      {
        path: "admin/status",
        element: (
          <ProtectRouter
            element={<AdminProductStatus />}
            allow={["ADMIN", "SUPERADMIN"]}
          />
        ), // Only allow "ADMIN"
      },
      {
        path: "admin/product",
        element: (
          <ProtectRouter
            element={<ProductManagement />}
            allow={["ADMIN", "SUPERADMIN"]}
          />
        ), // Only allow "ADMIN"
      },
      {
        path: "admin/user_management",
        element: (
          <ProtectRouter
            element={<UserManagement />}
            allow={["ADMIN", "SUPERADMIN"]}
          />
        ), // Only allow "ADMIN"
      },
      {
        path: "*",
        element: <Navigate to="/user" />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={guestRouter} />;
};

export default AppRouter;
