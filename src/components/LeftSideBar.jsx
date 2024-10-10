import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, StarsIcon } from "lucide-react";
import Heading from "./Typography/Heading";
import useUserStore from "../store/user-store";
import Banner from "./LoginButton";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";

export default function LeftSideBar() {
  const navigate = useNavigate();
  const actionLogout = useUserStore((state) => state.actionLogout);

  // const hdlLogOut = () => {
  //   navigate("/login");
  //   actionLogout();
  // };

  const hdlGotoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full max-w-[360px] min-w-[280px] p-6 rounded-2xl bg-[#7A5C61] min-h-[90vh] shadow-md">
      <div className="flex flex-col min-h-full justify-between">
        <div className="flex flex-col gap-10 ">
          <button
            onClick={() => document.getElementById("need-login").showModal()}
            className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-[#6E5357] cursor-pointer  "
          >
            <ShoppingBag size={32} color="white" />
            <Heading
              text="Order Now"
              fontSize={18}
              fontWeight="semibold"
              color="white"
            />
          </button>
          <button
            onClick={() => document.getElementById("need-login").showModal()}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#6E5357] cursor-pointer"
          >
            <StarsIcon size={32} color="white" />
            <Heading
              text="Status"
              fontSize={18}
              fontWeight="semibold"
              color="white"
            />
          </button>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="need-login" className="modal">
          <div className="modal-box flex flex-col gap-2 text-center">
            <h3 className="font-bold font-sans text-[24px]">Hello!</h3>
            <p className="py-4 font-sans text-[20px]">
              Please log in to explore and order more coffee.
            </p>
            <div className="flex gap-2 mx-auto">
              <SecondaryButton
                type="button"
                func={() => document.getElementById("need-login").close()}
                text="MAY BE LATER"
              />
              <PrimaryButton
                type="button"
                onClick={hdlGotoLogin}
                text="LOGIN"
              />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
