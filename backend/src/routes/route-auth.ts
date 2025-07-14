import Router from "express";
import {
  loginAuthController,
  registerAuthController
} from "../controllers/auth-controller";

const router = Router();

router.post("/login", loginAuthController);
router.post("/register", registerAuthController);

export default router;
