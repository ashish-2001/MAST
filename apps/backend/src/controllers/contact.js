import { success } from "zod";
import { Contact } from "../models/contactUs";
import { contactValidator } from "../../../../packages/shared/schemas/contactSchema";
import { mailSender } from "../../../../packages/shared/utils/mailSender";

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
            name,
            email,
            subject,
            message,
            status
        });

        if(!contact){
            return res.status(403).json({
                success: false,
                message: "Contact couldn't be created!"
            });
        };

        const infoSend = await mailSender({
                from: `"Customer <${process.env.MAIL_USER}>"`,
                to: process.env.MAIL_USER,
                subject: "New message from customer!",
                html: `
                    <p><b>Message resolve status: Pending</b></p>
                    <p>${message}</p>
                `,
                replyTo: email
            }
        );

        return res.status(200).json({
            messageData: infoSend,
            success: true,
            message: "Message sent successfully!"
        });
    } catch(e){
        return res.status(e).json({
            success: false,
            message: e.message
        })
    }
}