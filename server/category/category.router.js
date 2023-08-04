import { Router } from "express";
import categoryController from "./category.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = Router();

router.get("/get-all", categoryController.getAllCategories);

router.get("/get-by-id/:id", categoryController.getCategoryById);

router.post("/add", authMiddleware.verifyCustomer, categoryController.addCategory);

router.put("/edit/:id", categoryController.editCategory);

router.delete("/delete/:id", categoryController.deleteCategory);

export default router;