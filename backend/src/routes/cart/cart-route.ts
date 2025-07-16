import Router from "express"; 
import {
  addToCartController,
  calculateCartTotalController,
  clearUserCartController,
  getUserCartController,
  removeFromCartController,
  updateCartItemController
} from "../../controllers/cart/cart-controller";

const router = Router();

// Obtener carrito de un usuario
router.get("/:userId", getUserCartController);

// Obtener el total de todos los productos en el carrito
router.get("/calculate/:userId", calculateCartTotalController);

// Agregar producto al carrito
router.post("/add", addToCartController);

// Actualizar cantidad de un producto en el carrito
router.put("/update", updateCartItemController);

// Eliminar un producto del carrito
router.delete("/remove/:itemId", removeFromCartController);

// Vaciar carrito completo del usuario
router.delete("/clear/:userId", clearUserCartController);

export default router;
