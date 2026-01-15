import mongoose from "mongoose";

const ratingAndReviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    }
}, { timestamps: true });

const RatingAndReview = mongoose.model('RatingAndReview', ratingAndReviewsSchema);

export {
    RatingAndReview
};