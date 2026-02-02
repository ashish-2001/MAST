import z from "zod";

const ratingAndReviewValidator = z.object({
    rating: z.number().min(0, "Rating is required!").max(5, "Max 5 ratings are allowed!"),
    review: z.string().min(1, "Review is too short").max(500, "Review is too long")
});

export {
    ratingAndReviewValidator
};