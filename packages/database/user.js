import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CUSTOMER'],
        required: true
    },
    addresses: [
        {
            type: mongoose.Types.Schema.ObjectId,
            ref: 'Address'
        }
    ],
    profileImage: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export {
    userModel
}