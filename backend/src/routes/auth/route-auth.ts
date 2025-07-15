import Router from "express";
import {
  loginAuthController,
  registerAuthController,
  requestPasswordResetController,
  resendVerificationEmailController,
  resetPasswordController,
  verifyEmailController
} from "../../controllers/auth/auth-controller";

const router = Router();

//inicio y registro de usuario.
router.post("/login", loginAuthController);
router.post("/register", registerAuthController);
//envio para verificacion de cuenta.
router.get("/verify-email", verifyEmailController);
router.post("/resend-verification", resendVerificationEmailController);
//recuperacion de contraseña.
router.post("/request-password-reset", requestPasswordResetController);
router.post("/reset-password", resetPasswordController);

export default router;
