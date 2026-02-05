import { capturePayment, verifyPaymentAndCreateOrder } from "../controllers/payment";
import { auth, isCustomer, IsAdmin } from "../middleware/auth";
import express, { Router } from "express";

const router = express.Router();

router.post("/capturePayment", auth, isCustomer, capturePayment);
router.post("/verifyPayment", auth, IsAdmin, verifyPaymentAndCreateOrder)

export {
    router
}