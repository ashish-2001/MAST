import { createRatingAndReview, getAllRatingAndReviews, getAverageRating } from "../controllers/ratingAndReviews";
import { auth, isCustomer, IsAdmin } from "../middleware/auth";
import express from"express";

const router = express.Router();

router.post("/ratingAndReview", auth, isCustomer, createRatingAndReview);
router.get("/rantingAndReviews/getAllRatingAndReviews", auth, getAllRatingAndReviews);
router.get("/ratingAndReviews/getAverageRating", getAverageRating);

export {
    router
}