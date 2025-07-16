import { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getProductsByCategoryService
} from "../../services/category/category-services";

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const getAllCategories = await getAllCategoriesService();
    res.status(200).json({ getAllCategories });
  } catch (error: any) {
    console.error("Error al obtener todas la categorias", error);
    res.status(500).json({
      message: "Error al obtener todas las categorias disponibles",
      error
    });
  }
};

export const createCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name) {
      res
        .status(400)
        .json({ message: "El nombre de la categoria es obligatorio" });
    }
    const createCategories = await createCategoryService(name);
    res.status(200).json({ createCategories });
  } catch (error: any) {
    console.error("Error al crear la categoria", error);
    res
      .status(500)
      .json({ message: "Error al crear la categoria deseada", error });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res
        .status(400)
        .json({ message: "Error al eliminar la categoria seleccionada" });
    }
    const deleteCategory = await deleteCategoryService(id);
    res.status(200).json({ deleteCategory });
  } catch (error: any) {
    console.error("Error al poder eliminar la categoria seleccionada", error);
    res.status(500).json({
      message: "Error al poder eliminar la categoria seleccionada",
      error
    });
  }
};

export const getProductsByCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId = Number(req.params.categoryId);
    if (!categoryId) {
      res.status(400).json({
        message: "El ID es obligatorio para poder ver todas la categorias"
      });
    }
    const getProductsByCategory = await getProductsByCategoryService(
      categoryId
    );
    res.status(200).json({ getProductsByCategory });
  } catch (error: any) {
    console.error("Error a mostrar el producto por su categoria", error);
    res
      .status(500)
      .json({ message: "Error al mostrar el producto por categoria", error });
  }
};
