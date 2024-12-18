import React, { useEffect, useState } from "react";
import Heading from "./Typography/Heading";
import ModalButton from "./Button/ModalButton";
import Input from "./Input";
import SecondaryButton from "./Button/SecondaryButton";
import PrimaryButton from "./Button/PrimaryButton";
import useUserStore from "../store/user-store";
import useCartStore from "../store/cart-store";
import { toast } from "react-toastify";

export const OrderProductForm = () => {
  //Import From Zustand
  const actionAddCart = useCartStore((state) => state.actionAddCart);
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const currentItem = useCartStore((state) => state.currentItem);
  const setCurrentItem = useCartStore((state) => state.setCurrentItem);
  const [loading, setLoading] = useState(false);

  const [orderForm, setOrderForm] = useState({
    productId: currentItem.id,
    price: currentItem.price,
    sweetness: "S100",
    roast: currentItem.product_categoryId === 1 ? "MEDIUM" : null,
    comment: "",
    amount: 1,
  });

  const data = [
    { id: 1, text: "0%", value: "S0" },
    { id: 2, text: "25%", value: "S25" },
    { id: 3, text: "50%", value: "S50" },
    { id: 4, text: "75%", value: "S75" },
    { id: 5, text: "100%", value: "S100" },
  ];

  const hdlCloseModal = () => {
    document.getElementById("order-product").close();
    setCurrentItem(null);
  };

  const hdlOrderOption = (e) => {
    setOrderForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlOrderComment = (e) => {
    setOrderForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlIncreaseAmount = () => {
    setOrderForm((prv) => ({ ...prv, amount: prv.amount + 1 }));
  };

  const hdlDecreaseAmount = () => {
    if (orderForm.amount === 1) {
      return;
    }
    setOrderForm((prv) => ({ ...prv, amount: prv.amount - 1 }));
  };

  const hdlSendToCart = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await actionAddCart(orderForm);
      await actionGetCart();
      e.target.closest("dialog").close();
      setLoading(false);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(errorMessage);
      // console.log(errorMessage);
    }
  };

  return (
    <form onSubmit={hdlSendToCart} className={loading && "relative opacity-40"}>
      {loading && (
        <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4"></span>
      )}
      <div className="p-8 flex flex-col items-center gap-1 ">
        <img src={currentItem.image} alt="product-image" width="100px" />
        <Heading
          text={currentItem.name}
          color="primary"
          fontSize="18"
          fontWeight="bold"
        />
        <Heading
          text={`${currentItem.price} baht`}
          color="secondary"
          fontSize="16"
          fontWeight="normal"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          {/* Sweetness */}
          <Heading
            text="Sweetness"
            color="primary"
            fontSize="16"
            fontWeight="semibold"
          />
          <div className="flex justify-start gap-4">
            {data.map((item) => (
              <ModalButton
                type="button"
                key={item.id}
                name="sweetness"
                text={item.text}
                value={item.value}
                sweetness={orderForm.sweetness}
                func={hdlOrderOption}
              />
            ))}
          </div>
        </div>
        {currentItem.product_categoryId === 1 && (
          <div className="flex flex-col gap-1">
            {/* Roast */}
            <Heading
              text="Roast"
              color="primary"
              fontSize="16"
              fontWeight="semibold"
            />
            <div className="flex justify-start gap-4">
              <ModalButton
                type="button"
                name="roast"
                text="Light"
                value="LIGHT"
                roast={orderForm.roast}
                func={hdlOrderOption}
              />
              <ModalButton
                type="button"
                name="roast"
                text="Medium"
                value="MEDIUM"
                roast={orderForm.roast}
                func={hdlOrderOption}
              />
              <ModalButton
                type="button"
                name="roast"
                text="Dark"
                value="DARK"
                roast={orderForm.roast}
                defaultSelected="dark"
                func={hdlOrderOption}
              />
            </div>
          </div>
        )}

        <div>
          {/* Comment */}
          <Heading
            text="Comment"
            color="primary"
            fontSize="16"
            fontWeight="semibold"
          />
          <Input
            name="comment"
            value={orderForm.comment}
            onChange={hdlOrderComment}
            placeholder="Let us know your coffee preferences"
          />
        </div>

        <div className="flex items-center gap-3 justify-center py-2">
          {/* Amount */}
          {orderForm.amount === 1 ? (
            <SecondaryButton type="button" text="-" color="opacity-20" />
          ) : (
            <SecondaryButton func={hdlDecreaseAmount} type="button" text="-" />
          )}
          <Heading
            text={orderForm.amount}
            value={orderForm.amount}
            color="primary"
            fontSize="16"
            fontWeight="semibold"
          />
          <SecondaryButton func={hdlIncreaseAmount} type="button" text="+" />
        </div>

        <PrimaryButton text="Confirm" />
        <SecondaryButton type="button" text="Back" func={hdlCloseModal} />
      </div>
    </form>
  );
};
