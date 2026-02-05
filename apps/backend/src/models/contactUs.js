import mongoose from "mongoose";
import z from "zod";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    subject: {
        String
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved']
    }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export {
    Contact
}