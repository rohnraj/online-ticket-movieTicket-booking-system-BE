import express from "express"
const router = express.Router();
import { 
    registerUserController, 
    loginUserController, 
    refreshTokenController, 
    logoutController, 
    getUserController,
    updateUserController
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/refresh", refreshTokenController);
router.get("/logout", authMiddleware, logoutController);
router.get("/me", authMiddleware, getUserController);
router.put("/me", authMiddleware, updateUserController);

export default router;