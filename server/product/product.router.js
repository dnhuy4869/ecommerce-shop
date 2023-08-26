import { Router } from "express";
import productController from "./product.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = Router();

router.get("/get-all", productController.getAllProducts);

router.get("/get-by-id/:id", productController.getProductById);

router.get("/get-by-category/:id",productController.getProductsByCategory);

router.post("/add", authMiddleware.verifyCustomer, productController.addProduct);

router.put("/edit/:id", authMiddleware.verifyCustomer, productController.editProduct);

router.delete("/delete/:id", authMiddleware.verifyCustomer, productController.deleteProduct);

router.post("/delete-multiple", authMiddleware.verifyCustomer, productController.deleteMultipleProducts);

router.post("/upload-image", authMiddleware.verifyCustomer, productController.uploadImage);

export default router;