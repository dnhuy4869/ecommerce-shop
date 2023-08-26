import { Router } from "express";
import billController from "./bill.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = Router();

router.get("/get-by-id/:id", authMiddleware.verifyCustomer, billController.getBillById);

router.post("/add", authMiddleware.verifyCustomer, billController.addBill);

export default router;