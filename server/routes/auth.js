import authController from "../controllers/authController.js";
import { Router } from "express";

// Create a new router instance
const router = Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

export default router;