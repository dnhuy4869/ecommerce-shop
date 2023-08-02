import { Router } from "express";
import categoryController from "./category.controller.js";

const router = Router();

router.get("/get-all", categoryController.getAllCategories);

router.get("/get-by-id/:id", categoryController.getCategoryById);

router.post("/add", categoryController.addCategory);

router.put("/edit/:id", categoryController.editCategory);

router.delete("/delete/:id", categoryController.deleteCategory);

export default router;