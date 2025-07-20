import { Request, Response } from "express";
import { OrderStatus } from "@prisma/client";
import {
  createOrderServices,
  getAllOrdersService,
  getOrderByIdService,
  getOrderHistoryService,
  getOrdersByUserService,
  notifyOrderConfirmationService,
  updateOrderStatusService
} from "../../services/order/order-services";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.userId);
    if (isNaN(userId) || userId <= 0) {
      return res
        .status(400)
        .json({ message: "El ID del usuario es obligatorio" });
    }
    const createOrder = await createOrderServices(userId);
    if (!createOrder) {
      return res.status(400).json({
        message:
          "No se pudo crear la orden. Asegúrate de que el carrito no esté vacío."
      });
    }

    res.status(200).json({ createOrder });
  } catch (error: any) {
    console.error("Error a la hora de crear un nueva orden", error);
    res.status(500).json({
      message: "Error a la hora de poder crear una order",
      error: error
    });
  }
};

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const getAllOrders = await getAllOrdersService();
    if (!getAllOrders) {
      return res
        .status(400)
        .json({ message: "Error al obtener todas las ordenes" });
    }
    res.status(200).json({ getAllOrders });
  } catch (error: any) {
    console.error("Error al poder obtener las ordenes", error);
    res
      .status(500)
      .json({ message: "Error al poder obtener todas las ordenes", error });
  }
};

export const getOrdersByUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }
    const getOrdersByUser = await getOrdersByUserService(userId);
    res.status(200).json({ getOrdersByUser });
  } catch (error: any) {
    console.error("Error al poder obtener las ordenes del usuario", error);
    res.status(500).json({
      message: "Error al poder obtener todas las ordenes del usuario",
      error
    });
  }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ message: "ID de orden inválido" });
    }
    const getOrderById = await getOrderByIdService(orderId);
    res.status(200).json({ getOrderById });
  } catch (error: any) {
    console.error("Error al obtener la orden por su ID", error);
    res
      .status(500)
      .json({ message: "Error al obtener la orden por su ID", error });
  }
};

export const updateOrdeStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const orderId = Number(req.params.orderId);

    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ message: "ID de orden inválido" });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "El ID del pedido y el nuevo estado son obligatorios"
      });
    }

    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ message: "Estado no válido" });
    }

    const existingOrder = await getOrderByIdService(orderId);
    if (!existingOrder) {
      return res.status(404).json({ message: "La orden no existe" });
    }

    const updatedOrder = await updateOrderStatusService(
      orderId,
      status as OrderStatus
    );
    return res.status(200).json({ updatedOrder });
  } catch (error: any) {
    console.error("Error al actualizar el estado de la orden", error);
    return res
      .status(500)
      .json({ message: "Error al actualizar el estado del pedido", error });
  }
};

export const getOrderStatusController = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);
    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ message: "ID de orden inválido" });
    }

    const order = await getOrderByIdService(orderId);
    if (!order) {
      return res.status(404).json({ message: "La orden no existe" });
    }

    res.status(200).json({ status: order.status });
  } catch (error: any) {
    console.error("Error a la hora de mostrar el estado de la orden", error);
    res.status(500).json({
      message: "Error al mostrar el estado de la orden solicitada",
      error
    });
  }
};

export const getOrderHistoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.id);
    const { status } = req.query;

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    const orders = await getOrderHistoryService(userId);

    const filteredOrders = status
      ? orders.filter((order) => order.status === status)
      : orders;

    res.status(200).json({ history: filteredOrders });
  } catch (error: any) {
    console.error("Error al obtener historial de pedidos", error);
    res.status(500).json({
      message: "Error al obtener el historial de pedidos",
      error
    });
  }
};

export const notifyOrderConfirmationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId, total, userEmail } = req.body;

    if (typeof orderId !== "number" || isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({
        message:
          "El ID para la confirmación del email es obligatorio y debe ser un número"
      });
    }

    if (typeof total !== "number" || isNaN(total)) {
      return res.status(400).json({
        message: "El total del pedido es obligatorio y debe ser un número"
      });
    }

    if (
      !userEmail ||
      typeof userEmail !== "string" ||
      !userEmail.includes("@")
    ) {
      return res.status(400).json({
        message:
          "Se requiere un correo electrónico válido para la confirmación del pedido"
      });
    }

    const orderExists = await getOrderByIdService(orderId);
    if (!orderExists) {
      return res.status(404).json({
        message: "No se encontró la orden con el ID proporcionado"
      });
    }

    const notifyOrderConfirmation = await notifyOrderConfirmationService({
      orderId,
      total,
      userEmail
    });

    if (!notifyOrderConfirmation.success) {
      return res.status(500).json({
        message: "No se pudo enviar la confirmación del pedido",
        error: notifyOrderConfirmation.error
      });
    }

    return res.status(200).json({ notifyOrderConfirmation });
  } catch (error) {
    console.error("Error a la hora de confirmar el correo electrónico", error);
    return res.status(500).json({
      message: "Error interno a la hora de la confirmación",
      error
    });
  }
};
