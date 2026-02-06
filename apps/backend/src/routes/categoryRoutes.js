import { addProductToCategory, createCategory, deleteCategory, editCategory, getAllCategory } from '../controllers/category.js';
import { auth, IsAdmin, isCustomer } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.post("/category", auth, IsAdmin, createCategory);
router.get("/category/getAllCategories", auth, getAllCategory);
router.put("/category/updateCategory/:categoryId", auth, IsAdmin, editCategory);
router.delete("/category/deleteCategory/:categoryId", auth, IsAdmin, deleteCategory);
router.post("/category/addProductToCategory/:categoryId/products", auth, IsAdmin, addProductToCategory);

export {
    router
};