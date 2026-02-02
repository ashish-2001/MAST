import { ratingAndReviewValidator } from "../../../../packages/shared/schemas/ratingAndReviewSchema";
import { Product } from "../models/products";
import { RatingAndReview } from "../models/ratingAndReviews";
import { User } from "../models/user";


async function createRatingAndReview(req, res){
    const userId = req.user.userId;
    const { productId } = req.params;

    try{

        const parsedResult = ratingAndReviewValidator.safeParse(req.body);

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const { rating, review } = parsedResult.data;

        const user = await User.findById(userId);

        if(!user){
            return res.status(403).json({
                success: false,
                message: "User not found!"
            });
        };

        const product = await Product.findById(productId);

        if(!productId){
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        };

        const productDetails = await Product.findOne({
            _id: productId,
            customersPurchased: {
                $elemMatch: {
                    $eq: userId
                }
            }
        });

        if(!productDetails){
            return res.status(404).json({
                success: false,
                message: "Customer has not purchased this product!"
            });
        };

        const alreadyReviewed = await RatingAndReview.find({
            user: userId,
            product: productId
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "Product already reviewed by the user!"
            });
        };

        const ratingAndReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            product: productId
        });

        if(!ratingAndReview){
            return res.status(403).json({
                success: false,
                message: "Rating and review couldn't be created!"
            });
        };

        return res.status(200).json({
            data: ratingAndReview,
            success: true,
            message: "Rating and review created successfully!"
        });
        
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

export {
    createRatingAndReview
};