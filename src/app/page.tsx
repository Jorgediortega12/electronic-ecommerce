"use client";
import CheckoutForm from "@/components/CheckoutForm";
import { stripe } from "@/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Pago con Stripe</h1>
        <Elements stripe={stripe}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  );
}
