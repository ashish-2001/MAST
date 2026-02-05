import { createRatingAndReview, getAllRatingAndReviews, getAverageRating } from "../controllers/ratingAndReviews";
import { auth, isCustomer, IsAdmin } from "../middleware/auth";
import express from"express";

const router = express.Router();

router.post("/createRatingAndReview", auth, isCustomer, createRatingAndReview);
router.get("getAllRatingAndReviews", auth, getAllRatingAndReviews);
router.get("/getAverageRating", getAverageRating);

export {
    router
}