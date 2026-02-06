import { contactUs, deleteContactMessage, getContactMessagesByStatus, updateContactMessageStatus } from "../controllers/contact.js";
import express from "express";
import { auth, IsAdmin, isCustomer } from "../middleware/auth.js";


const router = express.Router();

router.post("/contactUs", auth, isCustomer, contactUs);
router.delete("/contactUs/deleteContactMessage/:contactId", auth, IsAdmin, deleteContactMessage);
router.put("/contactUs/updateContactMessageStatus/:contactId/status", auth, IsAdmin, updateContactMessageStatus);
router.get("/contactUs/getContactMessagesByStatus", auth, IsAdmin, getContactMessagesByStatus);

export { 
    router
};
