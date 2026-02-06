import { createRatingAndReview, getAllRatingAndReviews, getAverageRating } from "../controllers/ratingAndReviews.js";
import { auth, isCustomer, IsAdmin } from "../middleware/auth.js";
import express from"express";

const router = express.Router();

router.post("/ratingAndReview", auth, isCustomer, createRatingAndReview);
router.get("/rantingAndReviews/getAllRatingAndReviews", auth, getAllRatingAndReviews);
router.get("/ratingAndReviews/getAverageRating", getAverageRating);

export {
    router
}