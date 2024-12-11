import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// import { saveOrder } from "@/api/stripe";
import useOrderStore from "@/store/order-store";
import useCartStore from "@/store/cart-store";
import useUserStore from "@/store/user-store";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({
  dpmCheckerLink,
  onSuccess,
  totalPrice,
}) {
   
  const actionDeleteAllCart = useCartStore(
    (state) => state.actionDeleteAllCart
  );
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const actionAddOrder = useOrderStore((state) => state.actionAddOrder);
  const user = useUserStore((state) => state.user);
  const carts = useCartStore((state) => state.carts);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Payment submission started");

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    try {
      console.log("Confirming payment...");
      const payload = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      console.log("Payment response:", payload);

      if (payload?.error) {
        return console.log(payload?.error);
      }
      
      if (payload?.paymentIntent?.status === "succeeded") {
        const order = {}
        order.carts = carts
        order.totalPrice = totalPrice

        console.log("Payment succeeded, saving order...");
        const formData = new FormData();
        const convertOrder = JSON.stringify(order);
        formData.append("order", convertOrder);
        formData.append("paymentMethod", "CREDIT");
        console.log(formData, "form");

        // Send combined data
        await actionAddOrder(formData);

        // Handle success
        await actionDeleteAllCart(user?.id);
        await actionGetCart();
        onSuccess?.();
      }

      if (user.role === "USER") {
        return navigate("/user/order/status");
      } else {
        return navigate("/user/admin/status");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      setMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location,
          order amount, and currency.&nbsp;
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Preview payment methods by transaction
          </a>
        </p>
      </div>
    </>
  );
}
