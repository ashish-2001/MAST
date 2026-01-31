import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    categoryDescription: {
        type: String,
        required: true
    },
    categoryThumbnail: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export {
    Category
}