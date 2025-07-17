import Router from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  getOrdersByUserController,
  getOrderStatusController,
  updateOrdeStatusController,
  getOrderHistoryController
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

// Obtener historial de pedidos del usuario (con opción de filtrar por estado)
router.get("/user/:id/history", getOrderHistoryController);

//obtener el estado de la orden
router.get("/:orderId/status", getOrderStatusController);

// Actualizar estado del pedido
router.put("/:orderId/status", updateOrdeStatusController);

export default router;
