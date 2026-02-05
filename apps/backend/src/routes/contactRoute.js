import { contactUs } from "../controllers/contact";
import express from "express";


const router = express.Router();

router.post("/contactUs", contactUs);

export { 
    router
};
