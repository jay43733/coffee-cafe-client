import React from "react";
import Heading from "./Typography/Heading";
import chocolateDrink from "../assets/chocolate-drink.svg";
import PrimaryButton from "../components/Button/PrimaryButton";
import useUserStore from "../store/user-store";
import useCartStore from "../store/cart-store";
import { OrderProductForm } from "./OrderProductForm";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "./Button/SecondaryButton";

const Carousal = ({ item, index }) => {
  const token = useUserStore((state) => state.token);

  const navigate = useNavigate();

  const hdlClickProduct = (token) => {
    if(!token){
      return document.getElementById("need-login").showModal()
    }
    navigate("/user/order");
  };

  const hdlGotoLogin= async(id) =>{
    navigate("/login");
  }

  return (
    <div>
      <div className="flex justify-between px-16 py-8 w-[1084px] min-w-[200px] rounded-[64px] gap-12 bg-white">
        <div className="flex flex-col max-w-[720px] min-w-[400px] gap-4">
          {/* Caption */}
          <Heading
            text="Recommend"
            fontSize="24"
            fontWeight="normal"
            color="primary"
          />
          <Heading
            text={item.name}
            fontSize="48"
            fontWeight="semibold"
            color="primary"
          />
          <Heading
            text={item.description}
            fontSize="18"
            fontWeight="normal"
            color="primary_on_white"
          />
        </div>
        <div className="flex flex-col items-center max-w-[160px] min-w-[100px] p-10 gap-6">
          <img src={item.image} alt="chocolatedrink" />
          <PrimaryButton
            text="Order Now"
            type="button"
            onClick={() => hdlClickProduct( token)}
          />
        </div>
      </div>
      <dialog id="need-login" className="modal">
        <div className="modal-box flex flex-col gap-2 text-center">
          <h3 className="font-bold font-sans text-[24px]">Hello!</h3>
          <p className="py-4 font-sans text-[20px]">
            Please log in to explore and order more coffee.
          </p>
          <div className="flex flex-col gap-2 mx-auto">
            <SecondaryButton
              type="button"
              func={() => document.getElementById("need-login").close()}
              text="MAY BE LATER"
            />
            <PrimaryButton type="button" onClick={hdlGotoLogin} text="LOGIN" />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Carousal;
