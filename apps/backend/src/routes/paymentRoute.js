import { capturePayment, verifyPaymentAndCreateOrder } from "../controllers/payment.js";
import { auth, isCustomer, IsAdmin } from "../middleware/auth.js";
import express, { Router } from "express";

const router = express.Router();

router.post("/capturePayment", auth, isCustomer, capturePayment);
router.post("/verifyPayment", auth, IsAdmin, verifyPaymentAndCreateOrder)

export {
    router
}