import { stripe } from "../../lib/stripe";

export const createPaymentIntentServices = async (amount: number) => {
  const paymanetIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 10),
    currency: "usd",
    payment_method_types: ["card"]
  });
  return paymanetIntent.client_secret;
};
