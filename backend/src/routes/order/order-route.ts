import Router from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  getOrdersByUserController,
  updateOrdeStatusController
} from "../../controllers/order/order-controller";

const router = Router();

// Crear nuevo pedido
router.post("/", createOrderController);

// Obtener todos los pedidos
router.get("/", getAllOrdersController);

// Obtener un pedido por ID
router.get("/:id", getOrderByIdController);

// Obtener pedidos por usuario
router.get("/user/:id", getOrdersByUserController);

// Actualizar estado del pedido
router.put("/:orderId/status", updateOrdeStatusController);

export default router;
