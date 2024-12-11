import React, { useEffect, useState } from "react";
import Heading from "./Typography/Heading";
import ListMenu from "./ListMenu";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";
import useCartStore from "../store/cart-store";
import useUserStore from "../store/user-store";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "../config/axios";
import "../stripe.css";
import QrCode from "./QrCode";

const stripePromise = loadStripe(
  "pk_test_51QTyM3JKsFVoUyyZQkj1LzKb9WNdfnTvVoRpD6V8O895YBlUmniNDyWwLDk8pWb9qDIThKlbHjQEjA31d3tqhDji009XeWUCal"
);
export default function UserRightSideBar() {
  console.log(process.env.NODE_ENV,"ennnnnnnnnnnnnnnnnnnn")

  // Add state for client secret
  const carts = useCartStore((state) => state.carts);
  const user = useUserStore((state) => state.user);
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const actionDeleteAllCart = useCartStore(
    (state) => state.actionDeleteAllCart
  );
  let totalPrice = 0

  const [clientSecret, setClientSecret] = useState("");
  totalPrice = carts.reduce(
    (prev, curr) => prev + +curr?.amount * +curr?.products?.price,
    0
  );
  console.log(totalPrice, "total");

  // Add useEffect to get payment intent
  const getPaymentIntent = async () => {
    const result = await axios.post("/create-payment-intent", {
      amount: +totalPrice * 100,
    });

    setClientSecret(result?.data?.clientSecret);
  };

  useEffect(() => {
    if (totalPrice === 0) return;
    getPaymentIntent();
  }, [totalPrice]);

  console.log(clientSecret, "client");

  // Add Stripe options
  const options = {
    clientSecret,
    appearance: { theme: "stripe" },
  };
 
  // const [loading, setLoading] = useState(false);



  const [uploadImage, setUploadImage] = useState(null);

  const hdlResetOrder = async (id) => {
    await actionDeleteAllCart(id);
    await actionGetCart();
  };

  const hdlConfirmOrder = async () => {
    //Need to Pay bill before finish ordering
    if (clientSecret) {
      document.getElementById("pay-bill").showModal();
    }
  };

  const [isPaid, setIsPaid] = useState("");
  const [isClicked, setIsClicked] = useState("");

  useEffect(() => {
    actionGetCart();
  }, []);

  return (
    <div className="h-full fixed max-h-[808px]">
      {/* {loading && (
        <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4"></span>
      )} */}
      <div className="sticky top-4 z-10 px-8 py-10 flex flex-col bg-white rounded-2xl w-full max-w-[400px] min-w-[364px] h-full justify-between shadow-md">
        <div className="my-2 min-h-[400px] max-h-[540px]">
          <div className="flex flex-col gap-6">
            <Heading
              text="My Cart"
              fontSize="32"
              fontWeight="bold"
              color="Primary"
            />
            <Heading
              text="Menu"
              fontSize="18"
              fontWeight="regular"
              color="primary"
            />
          </div>
          <ScrollArea className="h-[440px] w-full">
            <div className="min-h-[400px] max-h-[400px]">
              {carts.map((item, index) => (
                <ListMenu key={index} item={item} />
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <Heading
              text="Total Price"
              fontSize="18"
              fontWeight="regular"
              color="primary"
            />
            <div className="flex justify-end">
              <Heading
                text={`${totalPrice.toLocaleString("en-US")} baht`}
                fontSize="24"
                fontWeight="bold"
                color="primary"
              />
            </div>
          </div>
          {totalPrice !== 0 && (
            <div className="flex flex-col gap-2">
              <PrimaryButton onClick={hdlConfirmOrder} text="Confirm" />
              <SecondaryButton
                type="button"
                text="Reset Orders"
                func={() => hdlResetOrder(user.id)}
              />
            </div>
          )}
        </div>
      </div>
      <dialog
        id="pay-bill"
        className="modal"
        onClose={() => {
          setUploadImage(null);
          setIsPaid("");
          setIsClicked("");
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
          {user?.role === "USER" ? (
            clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  dpmCheckerLink={`https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${clientSecret}`}
                  onSuccess={() => {
                    document.getElementById("pay-bill").close();
                    // Add your post-payment success logic here
                  }}
                  totalPrice={totalPrice}
                />
              </Elements>
            )
          ) : (
            <QrCode
              totalPrice={totalPrice}
              uploadImage={uploadImage}
              setUploadImage={setUploadImage}
              isPaid={isPaid}
              setIsPaid={setIsPaid}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
            />
          )}
          {/* <QrCode
              totalPrice={totalPrice}
              uploadImage={uploadImage}
              setUploadImage={setUploadImage}
              isPaid={isPaid}
              setIsPaid={setIsPaid}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
            /> */}
        </div>
      </dialog>
    </div>
  );
}
