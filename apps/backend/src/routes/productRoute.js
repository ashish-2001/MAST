import { isAborted } from "zod/v3";
import { createProduct, deleteProduct, editProduct, getAllProductDetails, getAllProducts } from "../controllers/product";
import { auth, IsAdmin, isCustomer } from "../middleware/auth";
import express from "express";

const router = express.Router();

router.post("/createProduct", auth, IsAdmin, createProduct);
router.put("/editProduct/:productId", auth, IsAdmin, editProduct);
router.get("/getAllProduct", getAllProducts);
router.get("/getAllProductDetails", getAllProductDetails);
router.delete("/deleteProduct/:productId", auth, IsAdmin, deleteProduct);

export {
    router
}