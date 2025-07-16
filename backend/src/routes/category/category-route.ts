import Router from "express";
import {
  createCategoriesController,
  deleteCategoryController,
  getAllCategoriesController,
  getProductsByCategoryController
} from "../../controllers/category/category-controller";

const router = Router();

router.get("/", getAllCategoriesController);
router.get("/:id/products", getProductsByCategoryController);
router.post("/", createCategoriesController);
router.delete("/:id", deleteCategoryController);

export default router;
