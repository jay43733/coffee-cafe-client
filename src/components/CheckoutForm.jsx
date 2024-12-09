import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { saveOrder } from "@/api/stripe";
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
  const user = useUserStore((state) => state.user);
  const carts = useCartStore((state) => state.carts);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    try {
      const payload = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if (payload?.paymentIntent?.status === "succeeded") {
        // Create FormData
        const formData = new FormData();

        // Add order data
        const orderData = {
          carts,
          totalPrice,
        };
        formData.append("order", JSON.stringify(orderData));

        // Add payment data
        formData.append("paymentMethod", "CREDIT");
        formData.append("paymentIntent", JSON.stringify(payload.paymentIntent));

        // Send combined data
        const response = await saveOrder(formData);
        console.log("Order saved:", response);

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

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
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
