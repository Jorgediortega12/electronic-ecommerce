import { Request, Response } from "express";
import {
  addToCartServices,
  calculateCartTotalServices,
  clearUserCartServices,
  getUserCartServices,
  removeFromCartServices,
  updateCartItemServices
} from "../../services/cart/cart-services";

export const getUserCartController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)

    if (!userId) {
      return res
        .status(400)
        .json({ message: "El ID del usuario es obligatorio" });
    }

    const cart = await getUserCartServices(userId);
    return res.status(200).json({ cart });
  } catch (error: any) {
    console.error("Error al obtener el carrito del usuario", error);
    return res.status(500).json({
      message: "Error al obtener el carrito del usuario",
      error: error.message
    });
  }
};

export const addToCartController = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        message: "userId, productId y quantity son campos obligatorios"
      });
    }

    const item = await addToCartServices(userId, productId, quantity);
    return res.status(201).json({ item });
  } catch (error: any) {
    console.error("Error al agregar producto al carrito", error);
    return res.status(500).json({
      message: "Error al agregar producto al carrito",
      error: error.message
    });
  }
};

export const updateCartItemController = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity) {
      return res.status(400).json({
        message: "itemId y quantity son campos obligatorios"
      });
    }

    const updatedItem = await updateCartItemServices(itemId, quantity);
    return res.status(200).json({ updatedItem });
  } catch (error: any) {
    console.error("Error al actualizar item del carrito", error);
    return res.status(500).json({
      message: "Error al actualizar item del carrito",
      error: error.message
    });
  }
};

export const removeFromCartController = async (req: Request, res: Response) => {
  try {
    const itemId = Number(req.params.itemId);

    if (!itemId) {
      return res.status(400).json({
        message: "El ID del producto a eliminar es obligatorio"
      });
    }

    const deletedItem = await removeFromCartServices(itemId);
    return res.status(200).json({ deletedItem });
  } catch (error: any) {
    console.error("Error al eliminar producto del carrito", error);
    return res.status(500).json({
      message: "Error al eliminar producto del carrito",
      error: error.message
    });
  }
};

export const clearUserCartController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        message: "El ID del usuario es obligatorio para limpiar el carrito"
      });
    }

    const clearedCart = await clearUserCartServices(userId);
    return res.status(200).json({ clearedCart });
  } catch (error: any) {
    console.error("Error al limpiar el carrito del usuario", error);
    return res.status(500).json({
      message: "Error al limpiar el carrito del usuario",
      error: error.message
    });
  }
};

export const calculateCartTotalController = async (
  _req: Request,
  res: Response
) => {
  try {
    const userId = Number(_req.params.userId);
    if (!userId) {
      res.status(400).json({
        message:
          "El ID del usuario es obligatorio para poder obtener el total de los productos"
      });
    }
    const calculateCartTotal = await calculateCartTotalServices(userId);
    res.status(200).json({ calculateCartTotal });
  } catch (error: any) {
    console.error("Error al obtener el total de los productos", error);
    res
      .status(500)
      .json({
        message: "Error al poder obtener el total de todos los productos",
        error
      });
  }
};
