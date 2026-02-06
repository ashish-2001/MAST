import mongoose from "mongoose";
import { mailSender } from "../../../../packages/shared/utils/mailSender.js";

const optSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['Customer', 'Admin'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
}, { timestamps: true });

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            otpTemplate(otp)
        );
        console.log("Email response", mailResponse);
    } catch(e){
        throw new error("Failed to send verification email", e.message);
    };
};

optSchema.pre("save", async function(next){
    console.log("New document saved in the database");

    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const Otp = mongoose.model('Otp', optSchema);

export {
    Otp
}