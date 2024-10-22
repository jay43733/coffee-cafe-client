import React, { useState } from "react";
import Heading from "./Typography/Heading";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";
import { PencilIcon, Trash2 } from "lucide-react";
import useCartStore from "../store/cart-store";
import useUserStore from "../store/user-store";
import { OrderProductUpdateForm } from "./OrderProductUpdateForm";
import DeleteButton from "./Button/DeleteButton";

export default function ListMenu({ item }) {
  const actionDeleteCart = useCartStore((state) => state.actionDeleteCart);
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const setCurrentCart = useCartStore((state) => state.setCurrentCart);
  const currentCart = useCartStore((state) => state.currentCart);

  const hdlDeleteCart = async (id) => {
    await actionDeleteCart(id);
    await actionGetCart();
  };

  const hdlEditCart = async (item) => {
    setCurrentCart(item);
    document.getElementById("order-cart").showModal();
  };

  return (
    <div>
      <div className="flex py-4 my-4 justify-between overflow-auto cursor-pointer w-full h-fit bg-white rounded-2xl hover:duration-300 hover:shadow-inner">
        <div className="flex items-center">
          <img src={item?.products?.image} alt="product image" width="40px" />
        </div>
        <div className="flex flex-1 pl-4 gap-4 items-center">
          <div className="flex flex-col w-full gap-2">
            <Heading
              text={item?.products?.name}
              fontSize="16"
              fontWeight="bold"
              color="primary"
            />
            <Heading
              text={`${item?.amount * item?.products?.price} baht`}
              fontSize="14"
              fontWeight="semibold"
              color="secondary"
            />
            {item.products?.product_categoryId === 1 && (
              <Heading
                text={item?.roast?.toLowerCase()}
                fontSize="12"
                fontWeight="regular"
                color="primary"
              />
            )}

            <Heading
              text={`${item?.sweetness?.slice(1)} %`}
              fontSize="12"
              fontWeight="regular"
              color="primary"
            />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="px-1 py-[6px] rounded-full h-8 w-8 text-center bg-[#7A5C61]">
              <Heading
                text={item.amount}
                fontSize="14"
                fontWeight="bold"
                color="white"
              />
            </div>
            <div className="flex">
              <SecondaryButton
                type="button"
                func={() => hdlEditCart(item)}
                text={<PencilIcon size={20} color="#7A5C61" />}
                color="rounded-none rounded-s-2xl text-white w-10 h-10 px-[10px] "
              />
              <DeleteButton
                type="button"
                text={<Trash2 size={20} color="white" />}
                func={() => hdlDeleteCart(item.id)}
              />
            </div>
          </div>
        </div>
      </div>
      <dialog
        id="order-cart"
        className="modal"
        onClose={() => {
          setCurrentCart(null);
        }}
      >
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => e.target.closest("dialog").close()}
          >
            ✕
          </button>
          {currentCart && <OrderProductUpdateForm />}
        </div>
      </dialog>
    </div>
  );
}
