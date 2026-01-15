import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },

    productDescription: {
        type: String,
        required: true
    },

    productsPrice: {
        type: Number,
        required: true
    },

    thumbnailImage: {
        type: String,
        required: true
    },

    productStock: {
        type: Number,
        required: true
    },

    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

const Product = mongoose.model('Product', productsSchema);

export {
    Product
}