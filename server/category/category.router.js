import { Router } from "express";
import categoryController from "./category.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = Router();

router.get("/get-all", categoryController.getAllCategories);

router.get("/get-by-id/:id", categoryController.getCategoryById);

router.post("/add", authMiddleware.verifyCustomer, categoryController.addCategory);

router.put("/edit/:id", authMiddleware.verifyCustomer, categoryController.editCategory);

router.delete("/delete/:id", authMiddleware.verifyCustomer, categoryController.deleteCategory);

router.post("/delete-multiple", authMiddleware.verifyCustomer, categoryController.deleteMultipleCategories);

router.post("/upload-image", authMiddleware.verifyCustomer, categoryController.uploadImage);

export default router;