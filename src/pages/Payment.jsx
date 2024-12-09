import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useUserStore from "@/store/user-store";
import axios from "axios";
import CheckoutForm from "@/components/CheckoutForm";
import "../stripe.css"


// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51QTyM3JKsFVoUyyZQkj1LzKb9WNdfnTvVoRpD6V8O895YBlUmniNDyWwLDk8pWb9qDIThKlbHjQEjA31d3tqhDji009XeWUCal"
);

const Payment = () => {
  const actionPayment = useUserStore((state) => state.actionPayment);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getPaymentIntent = async () => {
      const result = await axios.post(
        "http://localhost:8080/create-payment-intent"
      );

      console.log(result.data.clientSecret, "Yeah");
      setClientSecret(result?.data?.clientSecret);
    };
    getPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {clientSecret && (
        <Elements
          options={options}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
