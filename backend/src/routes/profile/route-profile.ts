import Router from "express";
import { authenticate } from "../../middleware/middleware";
import {
  getProfileController,
  updateProfile
} from "../../controllers/profile/profile-controller";

const router = Router();

router.get("/", authenticate, getProfileController);
router.put("/update", authenticate, updateProfile);

export default router;
