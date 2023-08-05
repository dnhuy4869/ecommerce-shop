import { Router } from "express";
import categoryController from "./category.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = Router();

router.get("/get-all", authMiddleware.verifyAdmin, categoryController.getAllCategories);

router.get("/get-by-id/:id", authMiddleware.verifyAdmin, categoryController.getCategoryById);

router.post("/add", authMiddleware.verifyAdmin, categoryController.addCategory);

router.put("/edit/:id", authMiddleware.verifyAdmin, categoryController.editCategory);

router.delete("/delete/:id", authMiddleware.verifyAdmin, categoryController.deleteCategory);

router.post("/delete-multiple", authMiddleware.verifyAdmin, categoryController.deleteMultipleCategories);

router.post("/upload-image", authMiddleware.verifyAdmin, categoryController.uploadImage);

export default router;