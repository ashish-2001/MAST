import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    secure: false
});

async function mailSender(email, title, body){
    try{
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
            replyTo
        });

        return info;
    } catch(e){
        return e.message
    };
};

export { 
    mailSender
};