import { Request, Response } from "express";
import { createPaymentIntentServices } from "../../services/payment/payment-services";

export const createPaymentIntentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      res.status(400).json({ message: "El monto es obligatorio" });
    }
    const clientSecret = await createPaymentIntentServices(amount);
    res.status(200).json({ clientSecret });
  } catch (error: any) {
    console.error("Error al crear el paymentIntent", error);
    res
      .status(500)
      .json({ message: "Error interno al generar el pago", error: error });
  }
};

export const stripeWebhookController = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful:", paymentIntent.id);

      break;
    case "payment_intent.payment_failed":
      const failedIntent = event.data.object;
      console.warn("PaymentIntent failed:", failedIntent.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
