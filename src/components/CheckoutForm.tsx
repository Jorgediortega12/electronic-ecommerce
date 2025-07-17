"use client";
import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const API_URL = "http://localhost:3001";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Llama al backend para crear el PaymentIntent
    axios
      .post(`${API_URL}/api/payment/create-intent`, { amount: 5000 }) // 50.00 USD
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error("Error al crear PaymentIntent:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!
      }
    });

    if (result.error) {
      alert("Error: " + result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("✅ Pago exitoso");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded text-white" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Pagar
      </button>
    </form>
  );
}
