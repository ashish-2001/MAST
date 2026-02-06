import { Contact } from "../models/contactUs.js";
import { contactValidator } from "../../../../packages/shared/schemas/contactSchema.js";
import { mailSender } from "../../../../packages/shared/utils/mailSender.js";
import { User } from "../models/user.js";

async function contactUs(req, res){

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

        await mailSender({
            from: `App support <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Thanks for contacting us!",
            html: `
                <p>Hi, </p>
                <p>We have received your message and will reply you soon.</p>
                <p>Regards, <b>MAST team</b></p>
            `
        })

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
};

async function deleteContactMessage(req, res){
    const userId = req.user.userId;
    const { contactId } = req.params;

    try{
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        const contactMessage = await Contact.findByIdAndDelete(contactId);

        if(!contactMessage){
            return res.status(404).json({
                success: false,
                message: "Contact message not found!"
            });
        };

        return res.status(200).json({
            success: true,
            message: "Contact message deleted successfully!"
        });
    }catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
};

async function updateContactMessageStatus(req, res){
    const userId = req.user.userId;
    const { contactId } = req.params;
    const { status } = req.body;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        const contactMessage = await Contact.findById(contactId);
        if(!contactMessage){
            return res.status(404).json({
                success: false,
                message: "Contact message not found!"
            })
        }

        if(contactMessage.status === "Resolved"){
            return res.status(400).json({
                success: false,
                message: "Contact message status is already resolved!"
            });
        };

        contactMessage.status = status;
        await contactMessage.save();

        await mailSender({
            from: `From Mast team, <${process.env.MAIL_USER}>`,
            to: contactMessage.email,
            subject: "Regarding problems while purchasing!",
            html: `
                <p>Your problem has been resolved</p>
                <p><b>Regards, MAST team</b></p>
            `
        });
    }catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function getContactMessagesByStatus(req, res){
    try{
        const { status } = req.query;
        if(!["Pending", "Resolved"].includes(status)){
            return res.status(400).json({
                success: false,
                message: "Invalid status!"
            });
        };

        const messages = await Contact.find({
            status
        }, "name email subject message status").sort({ createdAt: -1 });

        if(!messages){
            return res.status(404).json({
                success: false,
                message: "Message not fetched!"
            })
        }

        return res.status(200).json({
            messages: messages,
            success: true,
            message: "All messages fetched status wise successfully!"
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        })
    };
};

export {
    contactUs,
    deleteContactMessage,
    updateContactMessageStatus,
    getContactMessagesByStatus
}