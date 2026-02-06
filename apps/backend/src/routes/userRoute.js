import { changePassword, sendOtp, signin, signup } from "../controllers/Auth.js";
import { auth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.post("/sendOtp", sendOtp);
router.put("/changePassword", auth, changePassword);

export {
    router
};