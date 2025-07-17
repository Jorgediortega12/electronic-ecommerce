import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-06-30.basil"
});

export const stripeWebhookService = async (event: Stripe.Event) => {
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Pago exitoso:", paymentIntent.id);
      // aqui mas adelante despues de probar implementar el estado para actualizar en pago en la bases de datos.
      break;

    case "payment_intent.payment_failed":
      const failedIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Pago fallido:", failedIntent.last_payment_error?.message);
      // aqui registramos el error y notificarlo al usuario en cuestion
      break;

    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return { received: true };
};
