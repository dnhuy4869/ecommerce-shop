import { Router } from "express";
import productController from "./product.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = Router();

router.get("/get-all", authMiddleware.verifyAdmin, productController.getAllProducts);

router.get("/get-by-id/:id", authMiddleware.verifyAdmin, productController.getProductById);

router.post("/add", authMiddleware.verifyAdmin, productController.addProduct);

router.put("/edit/:id", authMiddleware.verifyAdmin, productController.editProduct);

router.delete("/delete/:id", authMiddleware.verifyAdmin, productController.deleteProduct);

router.post("/delete-multiple", authMiddleware.verifyAdmin, productController.deleteMultipleProducts);

router.post("/upload-image", authMiddleware.verifyAdmin, productController.uploadImage);

export default router;