import React, { useState } from "react";
import Heading from "./Typography/Heading";
import RedButton from "./Button/RedButton";
import { LockOpenIcon, Trash2 } from "lucide-react";
import useUserStore from "../store/user-store";
import { toast } from "react-toastify";
import coffeecafe_logo from "../assets/coffeecafe-logo.svg";
import ChangeRole from "./ChangeRole";
import SecondaryButton from "../components/Button/SecondaryButton";

const ListUser = ({
  item,
  index,
  hdlUpdateRole,
  hdlDeleteUser,
  hdlReactiveUser,
}) => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <tr
        className={`bg-white text-left border-gray-200 ${
          user.email === item.email
            ? "hover:bg-[#d79e9ea8] hover:text-[#251c1d] text-[#251c1d] duration-200 font-bold"
            : "hover:bg-[#ECF1F6] duration-200"
        } text-left border-gray-200`}
      >
        <td className="px-8 py-10 w-[5%]">
          <Heading
            text={index + 1}
            color="secondary"
            fontSize="16"
            fontWeight="semiBold"
          />
        </td>
        <td className="px-8 py-10 w-[20%]">
          <Heading
            text={item.email}
            color="secondary"
            fontSize="16"
            fontWeight="semiBold"
          />
        </td>
        <td className="px-8 py-10 w-[20%]">
          <Heading
            text={`${item.firstName} ${item.lastName}`}
            color="secondary"
            fontSize="16"
            fontWeight="semiBold"
          />
        </td>
        <td className="px-8 py-10 w-[10%]">
          <Heading
            text={item.phoneNumber}
            color="secondary"
            fontSize="16"
            fontWeight="semiBold"
          />
        </td>
        <td className="px-6 py-10 w-[40%]">
          {item?.email === "admin@gmail.com" && item?.role === "SUPERADMIN" ? (
            <Heading text="Super Admin" fontSize="16" fontWeight="semiBold" />
          ) : user.email === item.email ? (
            <p></p> // Empty content if it's the current user, change as needed
          ) : (
            <select
              className="block w-full px-2 py-1 border border-gray-300 bg-white h-12 rounded-md shadow-sm sm:text-sm text-gray-700"
              value={item.role}
              onChange={(e) => hdlUpdateRole(e.target.value, item, item.id)}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          )}
        </td>

        <td className="px-8 py-10 w-[5%]">
          {item.role === "USER" ? (
            <>
              {item.user_status === "INACTIVE" ? (
                <SecondaryButton
                  Icon={() => <LockOpenIcon size={20} />}
                  text="Reactive"
                  func={() => hdlReactiveUser(item.id, item)}
                  // style="h-full"
                />
              ) : (
                <RedButton
                  Icon={() => <Trash2 size={20} />}
                  text="Delete"
                  style="h-full"
                  onClick={() => hdlDeleteUser(item.id, item)}
                />
              )}
            </>
          ) : (
            <div className="flex items-end gap-2 justify-center">
              {item.role === "ADMIN" ? (
                <Heading
                  text={`${item.role.slice(0, 1)}${item.role
                    .slice(1)
                    .toLowerCase()}`}
                  color="primary"
                  fontSize="18"
                  fontWeight="bold"
                />
              ) : (
                <Heading
                  text={`${item.role.slice(0, 1)}${item.role
                    .slice(1)
                    .toLowerCase()}`}
                  color="primary"
                  fontSize="18"
                  fontWeight="bold"
                />
              )}

              <img src={coffeecafe_logo} alt="logo" width="18px" />
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default ListUser;
