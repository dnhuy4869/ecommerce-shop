import authController from "./auth.controller.js";
import { Router } from "express";

const router = Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

export default router;