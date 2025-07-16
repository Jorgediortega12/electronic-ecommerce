import { Request, Response } from "express";
import { OrderStatus } from "@prisma/client";
import {
  createOrderServices,
  getAllOrdersService,
  getOrderByIdService,
  getOrdersByUserService,
  updateOrderStatusService
} from "../../services/order/order-services";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.userId);
    if (!userId) {
      return res
        .status(400)
        .json({ message: "El ID de la orden debe ser obligatorio" });
    }
    const createOrder = await createOrderServices(userId);
    res.status(200).json({ createOrder });
  } catch (error: any) {
    console.error("Error a la hora de crear un nueva orden", error);
    res
      .status(500)
      .json({ message: "Error a la hora de poder crear una order", error });
  }
};

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const getAllOrders = await getAllOrdersService();
    if (!getAllOrders) {
      res.status(400).json({ message: "Error al obtener todas las ordenes" });
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
    const userId = Number(req.params.userId);
    if (!userId) {
      res
        .status(400)
        .json({ message: "Error al poder obtener la orden del usuario" });
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
    const orderId = Number(req.params.userId);
    if (!orderId) {
      res.status(400).json({ message: "Error al obtener la orden" });
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
    const { status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        message: "El ID del pedido y el nuevo estado son obligatorios"
      });
    }

    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ message: "Estado no válido" });
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
