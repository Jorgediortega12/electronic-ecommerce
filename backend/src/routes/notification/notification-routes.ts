import Routes from "express";
import { notifyOrderConfirmationController } from "../../controllers/order/order-controller";

const router = Routes();

router.post("/confirmation-order", notifyOrderConfirmationController);

export default router;
