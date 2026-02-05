import { addProductToCategory, createCategory, deleteCategory, editCategory, getAllCategory } from '../controllers/category';
import { auth, IsAdmin, isCustomer } from '../middleware/auth';
import express from 'express';

const router = express.Router();

router.post("/createCategory", auth, IsAdmin, createCategory);
router.get("/getAllCategories", auth, getAllCategory);
router.put("/updateCategory/:categoryId", auth, IsAdmin, editCategory);
router.delete("/deleteCategory/:categoryId", auth, IsAdmin, deleteCategory);
router.post("/addProductToCategory", auth, IsAdmin, addProductToCategory);

export {
    router
};