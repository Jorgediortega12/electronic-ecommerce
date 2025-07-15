import { Request, Response } from "express";
import {
  createProductServices,
  deleteProductServices,
  getAllProductsServices,
  getProductByIdServices,
  updateProductServices
} from "../../services/product/product-services";

export const getAllProductController = async (_req: Request, res: Response) => {
  try {
    const getAllProduct = await getAllProductsServices();
    if (!getAllProduct) {
      res
        .status(404)
        .json({ message: "No hay productos disponibles por el momento" });
    }
    res.status(200).json({ getAllProduct });
  } catch (error: any) {
    console.error("Error al obtener todos los productos", error);
    res.status(500).json({
      message: "Error a poder obtener todos los productos disponibles",
      error
    });
  }
};

export const getProductByIdController = async (
  _req: Request,
  res: Response
) => {
  try {
    const id = Number(_req.params.id);

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID del producto es obligatorio" });
    }

    const productById = await getProductByIdServices(id);
    if (!productById) {
      return res.status(404).json({
        message: "Error al poder obtener el producto por el ID correspondiente"
      });
    }
    res.status(200).json({ productById });
  } catch (error: any) {
    console.error("Error al poder obtener el producto por su ID", error);
    res
      .status(500)
      .json({ message: "Error al poder obtener el producto por su ID", error });
  }
};

export const createProductController = async (_req: Request, res: Response) => {
  try {
    const { name, description, price, image } = _req.body;
    const createProduct = await createProductServices({
      name,
      description,
      price,
      image
    });
    if (!name || !description || !price || !image) {
      res.status(404).json({
        message:
          "Cada uno de los campos son obligatorio para poder crear un producto"
      });
    }
    res.status(200).json({ createProduct });
  } catch (error: any) {
    console.error("Error a la hora de poder crear el producto", error);
    res
      .status(500)
      .json({ message: "Error a la hora de crear el producto", error });
  }
};

export const updateProductController = async (_req: Request, res: Response) => {
  try {
    const id = Number(_req.params.id);
    const { name, description, price, image } = _req.body;

    if (!id) {
      return res.status(400).json({
        message: "El ID del producto es obligatorio para actualizar"
      });
    }

    const udpateProduct = await updateProductServices(id, {
      name,
      description,
      price,
      image
    });

    if (!udpateProduct) {
      return res
        .status(404)
        .json({ message: "Error al actualizar los datos existentes" });
    }

    res.status(200).json({ udpateProduct });
  } catch (error: any) {
    console.error("Error a la hora de actualizar los datos existentes", error);
    res.status(500).json({
      message: "Error al actualizar datos existentes del producto",
      error
    });
  }
};

export const deleteProductController = async (_req: Request, res: Response) => {
  try {
    const id = Number(_req.params.id);

    if (!id) {
      return res.status(400).json({
        message: "El ID del producto es obligatorio para eliminar"
      });
    }

    const deleteProduct = await deleteProductServices(id);
    if (!deleteProduct) {
      return res
        .status(404)
        .json({ message: "Error al eliminar el producto seleccionado" });
    }
    res.status(200).json({ deleteProduct });
  } catch (error: any) {
    console.error("Error al eliminar el producto", error);
    res.status(500).json({
      message: "Error al eliminar el producto seleccionado con el ID",
      error
    });
  }
};
