import mongoose from "mongoose";

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
    }
}, { timestamps: true });

const Otp = mongoose.model('Otp', optSchema);

export {
    Otp
}