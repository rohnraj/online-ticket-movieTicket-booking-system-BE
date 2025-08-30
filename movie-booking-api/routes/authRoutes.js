import express from "express"
const router = express.Router();
import { registerUserController, loginUserController, refreshTokenController, logoutController} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/refresh", refreshTokenController);
router.get("/logout", logoutController);

export default router;