import React, { useState } from "react";
import Heading from "./Typography/Heading";
import ModalButton from "./Button/ModalButton";
import Input from "./Input";
import SecondaryButton from "./Button/SecondaryButton";
import PrimaryButton from "./Button/PrimaryButton";
import useUserStore from "../store/user-store";
import useCartStore from "../store/cart-store";
import { toast } from "react-toastify";

export const OrderProductUpdateForm = () => {
  //Import From Zustand
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const actionUpdateCart = useCartStore((state) => state.actionUpdateCart);
  const currentCart = useCartStore((state) => state.currentCart);
  const setCurrentCart = useCartStore((state) => state.setCurrentCart);

  const [orderUpdateForm, setOrderUpdateForm] = useState({
    productId: currentCart?.id,
    price: currentCart?.price,
    sweetness: currentCart?.sweetness,
    roast: currentCart?.roast,
    comment: currentCart?.comment,
    amount: currentCart?.amount,
  });

  const data = [
    { id: 1, text: "0%", value: "S0" },
    { id: 2, text: "25%", value: "S25" },
    { id: 3, text: "50%", value: "S50" },
    { id: 4, text: "75%", value: "S75" },
    { id: 5, text: "100%", value: "S100" },
  ];

  const hdlCloseModal = () => {
    setCurrentCart(null);
    document.getElementById("order-cart").close();
  };

  const hdlOrderOption = (e) => {
    console.log(e.target.value, "Option");
    setOrderUpdateForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlOrderComment = (e) => {
    console.log(e.target.value, "Comment");
    setOrderUpdateForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlIncreaseAmount = () => {
    setOrderUpdateForm((prv) => ({ ...prv, amount: prv.amount + 1 }));
  };

  const hdlDecreaseAmount = () => {
    if (orderUpdateForm.amount === 1) {
      return;
    }
    setOrderUpdateForm((prv) => ({ ...prv, amount: prv.amount - 1 }));
  };

  const hdlSendToCart = async (e, id) => {
    try {
      e.preventDefault();
      await actionUpdateCart(orderUpdateForm, id);
      await actionGetCart();
      e.target.closest("dialog").close();
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    <form onSubmit={(e) => hdlSendToCart(e, currentCart.id)}>
      <div className="p-8 flex flex-col items-center gap-1 ">
        <img
          src={currentCart?.products?.image}
          alt="product-image"
          width="100px"
        />
        <Heading
          text={currentCart?.name}
          color="primary"
          fontSize="18"
          fontWeight="bold"
        />
        <Heading
          text={`${currentCart?.products?.price*currentCart?.amount} baht`}
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
                sweetness={orderUpdateForm.sweetness}
                func={hdlOrderOption}
              />
            ))}
          </div>
        </div>
        {currentCart?.products?.product_categoryId === 1 && (
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
                roast={orderUpdateForm.roast}
                func={hdlOrderOption}
              />
              <ModalButton
                type="button"
                name="roast"
                text="Medium"
                value="MEDIUM"
                roast={orderUpdateForm.roast}
                func={hdlOrderOption}
              />
              <ModalButton
                type="button"
                name="roast"
                text="Dark"
                value="DARK"
                roast={orderUpdateForm.roast}
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
            value={orderUpdateForm.comment}
            onChange={hdlOrderComment}
            placeholder="Let us know your coffee preferences"
          />
        </div>

        <div className="flex items-center gap-3 justify-center py-2">
          {/* Amount */}
          {orderUpdateForm.amount === 1 ? (
            <SecondaryButton type="button" text="-" color="opacity-20" />
          ) : (
            <SecondaryButton func={hdlDecreaseAmount} type="button" text="-" />
          )}
          <Heading
            text={orderUpdateForm.amount}
            value={orderUpdateForm.amount}
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
