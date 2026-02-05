import { contactUs, deleteContactMessage, getContactMessagesByStatus, updateContactMessageStatus } from "../controllers/contact";
import express from "express";
import { auth, IsAdmin, isCustomer } from "../middleware/auth";


const router = express.Router();

router.post("/contactUs", auth, isCustomer, contactUs);
router.delete("/deleteContactMessage", auth, IsAdmin, deleteContactMessage);
router.put("/updateContactMessageStatus", auth, IsAdmin, updateContactMessageStatus);
router.get("/getContactMessagesByStatus", auth, IsAdmin, getContactMessagesByStatus);

export { 
    router
};
