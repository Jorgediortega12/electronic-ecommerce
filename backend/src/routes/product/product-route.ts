import Router from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getProductByIdController,
  updateProductController
} from "../../controllers/product/product-controller";

const router = Router();

router.get("/", getAllProductController);
router.get("/:id", getProductByIdController);
router.post("/create", createProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
