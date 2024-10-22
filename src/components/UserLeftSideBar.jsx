import React, { useState } from "react";
import SecondaryButton from "./Button/SecondaryButton";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Contact,
  HomeIcon,
  ShoppingBag,
  StarsIcon,
  User,
} from "lucide-react";
import Heading from "./Typography/Heading";
import useUserStore from "../store/user-store";

export default function UserLeftSideBar() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const actionLogout = useUserStore((state) => state.actionLogout);

  const hdlLogOut = () => {
    navigate("/");
    actionLogout();
  };

  return (
    <div className="w-full max-w-[280px] min-w-[280px] h-fit p-6 rounded-2xl bg-[#7A5C61] hover:shadow-2xl ">
      <div className="flex gap-[360px] flex-col justify-between">
        <div className="flex flex-col gap-1 min-h-[360px] max-h-[1000px]  ">
          <NavLink
            to="/user"
            end // Add this prop to ensure it only matches the exact path "/user"
            className={({ isActive }) =>
              `flex items-center gap-4 px-8 py-4 rounded-xl ${
                isActive ? "bg-[#574145]" : "hover:bg-[#6E5357]"
              }`
            }
          >
            <span className="flex gap-4 items-center">
              <HomeIcon size={24} color="white" />
              <Heading
                text="Home"
                fontSize={18}
                fontWeight="regular"
                color="white"
              />
            </span>
          </NavLink>
          <NavLink
            to="/user/order"
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-8 py-4 rounded-xl ${
                isActive ? "bg-[#574145]" : "hover:bg-[#6E5357]"
              }`
            }
          >
            <span className="flex gap-4 items-center">
              <ShoppingBag size={24} color="white" />
              <Heading
                text="Order Now"
                fontSize={18}
                fontWeight="regular"
                color="white"
              />
            </span>
          </NavLink>
          {user.role === "USER" ? (
            <NavLink
              to="/user/order/status"
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4 rounded-xl ${
                  isActive ? "bg-[#574145]" : "hover:bg-[#6E5357]"
                }`
              }
            >
              <span className="flex gap-4 items-center">
                <StarsIcon size={24} color="white" />
                <Heading
                  text="Status"
                  fontSize={18}
                  fontWeight="regular"
                  color="white"
                />
              </span>
            </NavLink>
          ) : (
            <NavLink
              to="/user/admin/status"
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4 rounded-xl ${
                  isActive ? "bg-[#574145]" : "hover:bg-[#6E5357]"
                }`
              }
            >
              <span className="flex gap-4 items-center">
                <StarsIcon size={24} color="white" />
                <Heading
                  text="Status"
                  fontSize={18}
                  fontWeight="regular"
                  color="white"
                />
              </span>
            </NavLink>
          )}
          <NavLink
            to="/user/profile"
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-8 py-4 rounded-xl ${
                isActive ? "bg-[#574145]" : "hover:bg-[#6E5357]"
              }`
            }
          >
            <span className="flex gap-4 items-center">
              <User size={24} color="white" />
              <Heading
                text="Profile"
                fontSize={18}
                fontWeight="regular"
                color="white"
              />
            </span>
          </NavLink>
          {(user.role === "ADMIN" || user.role === "SUPERADMIN") && (
            <NavLink
              to="/user/admin/product"
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4 rounded-xl ${
                  isActive ? "bg-[#574145]" : "hover:bg-[#6E5357]"
                }`
              }
            >
              <span className="flex gap-4 items-center">
                <Box size={24} color="white" />
                <Heading
                  text="Product Store"
                  fontSize={18}
                  fontWeight="regular"
                  color="white"
                />
              </span>
            </NavLink>
          )}
          {(user.role === "ADMIN" || user.role === "SUPERADMIN") && (
            <NavLink
              to="/user/admin/user_management"
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4 rounded-xl ${
                  isActive ? "bg-[#574145]" : "hover:bg-[#6E5357]"
                }`
              }
            >
              <span className="flex gap-4 items-center">
                <Contact size={24} color="white" />
                <Heading
                  text="Manage Users"
                  fontSize={18}
                  fontWeight="regular"
                  color="white"
                />
              </span>
            </NavLink>
          )}
        </div>
        <SecondaryButton text="LOG OUT" func={hdlLogOut} />
      </div>
    </div>
  );
}
