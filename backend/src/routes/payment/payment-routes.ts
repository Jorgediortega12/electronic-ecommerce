import Router from "express";
import {
  createPaymentIntentController,
  stripeWebhookController
} from "../../controllers/payment/payment-controller";

const router = Router();

router.post("/create-intent", createPaymentIntentController);
router.post("/stripe-payment", stripeWebhookController);

export default router;
