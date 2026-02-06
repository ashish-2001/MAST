import { createProduct, deleteProduct, editProduct, getAllProductDetails, getAllProducts } from "../controllers/product.js";
import { auth, IsAdmin, isCustomer } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.post("/product", auth, IsAdmin, createProduct);
router.put("/product/editProduct/:productId", auth, IsAdmin, editProduct);
router.get("/product/getAllProduct", getAllProducts);
router.get("/product/getAllProductDetails", getAllProductDetails);
router.delete("/product/deleteProduct/:productId", auth, IsAdmin, deleteProduct);

export {
    router
}