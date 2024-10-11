import React from "react";
import SecondaryButton from "./Button/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, ShoppingBag, StarsIcon } from "lucide-react";
import Heading from "./Typography/Heading";
import useUserStore from "../store/user-store";
import UserBanner from "./UserBanner";

export default function UserLeftSideBar() {
  const navigate = useNavigate();
  const actionLogout = useUserStore((state) => state.actionLogout);
  
  const hdlLogOut = ()=>{
    navigate("/")
    actionLogout()
  }

  
  return (
    <div className="w-full max-w-[360px] min-w-[280px] h-full p-6 rounded-2xl bg-[#7A5C61]   hover:shadow-2xl ">
      <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-10 ">
            <Link to="/user">
              <span className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-[#6E5357] ">
                <HomeIcon size={32} color="white" />
                <Heading
                  text="Home"
                  fontSize={18}
                  fontWeight="semibold"
                  color="white"
                />
              </span>
            </Link>
            <Link to="/user/order">
              <span className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-[#6E5357]">
                <ShoppingBag size={32} color="white" />
                <Heading
                  text="Order Now"
                  fontSize={18}
                  fontWeight="semibold"
                  color="white"
                />
              </span>
            </Link>
            <Link to="/user/order/status">
              <span className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#6E5357]">
                <StarsIcon size={32} color="white" />
                <Heading
                  text="Status"
                  fontSize={18}
                  fontWeight="semibold"
                  color="white"
                />
              </span>
            </Link>
          </div>
        {/* </div> */}
        <SecondaryButton text="LOG OUT" func={hdlLogOut} />
      </div>
    </div>
  );
}
