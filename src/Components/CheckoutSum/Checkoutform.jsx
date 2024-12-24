import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import useTokenVerification from "../hooks/useTokenVerification";
import axios from "axios";
import { useQueryClient } from 'react-query';
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
// Your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51P1t8WSBkoBjEhoP9de0Sdnq6JDXXxaw6WC2h1BP7UiWJUC7dwzcLDfJey9HBxNYXLTQQ81KOFbjygc6kxevwoJB00O9qKJlDt"
);
const CheckoutForm = ({ info }) => {
  console.log(info);
  const queryClient = useQueryClient();
  const userDate = useSelector((state) => state.cart.billing);
  const total = useSelector((state) => state.cart.total);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const orderId = Cookies.get("orderId");
  const cartNumber = Cookies.get("userId");
  const { isVerified, isLoading1, error, user } = useTokenVerification();
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    // Fetch the payment details from your backend
    const response = await fetch("https://baseo.onrender.com/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total, // Amount in smallest unit (e.g., paise)
        currency: "eur",
        description: "This is Baseo",
        customerName: userDate?.BillingFirstname,
        customerAddress: userDate && {
          line1: userDate?.ShippingAddress,
          city: userDate?.ShippingCity,
          postal_code: userDate?.ShippingPostalcode,
          country: userDate?.ShippingCountry,
        },
      }),
    });

    const paymentData = await response.json();

    // Confirm the payment with the client secret
    const { clientSecret } = paymentData;
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error.message);
      setIsProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");

        // Send the payment success info to your backend webhook
        const webhookResponse = await axios.put(
          "https://baseo.onrender.com/checkout",
          {
            stripeId: paymentIntent.id,
            orderId: orderId,
            user: user.userId,
            date: new Date(),
            cartNumber: cartNumber,
          }
        );
        queryClient.invalidateQueries(["cart-details", orderId]);
        const webhookData = webhookResponse;
        // localStorage.removeItem('shipping')
        setIsProcessing(false);

        window.location.href = "/order-success/" + orderId;
        // console.log('Webhook called successfully:', webhookResponse);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="card"
          className="block text-sm font-medium text-gray-700"
        >
          Credit or Debit Card
        </label>
        <div className="mt-2">
          <CardElement
            id="card"
            className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="w-[100%] mt-10 flex items-center justify-between ">
        <a
          href={"."}
          className="text-lg font-semibold tracking-wider   flex items-center gap-1"
        >
          <FaArrowLeftLong />
          <span className="underline">Continue Shopping</span>{" "}
        </a>
        <button
          type="submit"
          disabled={isProcessing}
          className="px-4 py-2 bg-[#4ab420] capitalize font-bold tracking-wider text-white rounded"
        >
          {isProcessing ? "Processing..." : `CONTINUE TO PAY £ ${total}`}
        </button>
      </div>
    </form>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentPage;
