import { success } from "zod";
import { Contact } from "../models/contactUs";
import { contactValidator } from "../../../../packages/shared/schemas/contactSchema";

async function createContact(req, res){

    const userId = req.user.userId;
    
    try{

        const parsedResult = contactValidator.safeParse(req.body);

        if(!parsedResult.success){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };
        
        const { name, email, subject, message, status } = parsedResult.data;
        
        const contact = await Contact.create({

        })
    } catch(e){
        return res.status(e).json({
            success: false,
            message: e.message
        })
    }
}