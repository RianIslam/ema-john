import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Ie4k9ArLxmjyrNDVhqtWyoHu4tLUN2CWRmM42PpuU8fYH9WgFNS5lBRzo64cQJ852qMv7ucCzxfhY0PpcqFs7Am00paaIa4Jf"
);

const ProcessPayment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </Elements>
    </div>
  );
};

export default ProcessPayment;
