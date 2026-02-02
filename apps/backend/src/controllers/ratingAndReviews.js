import mongoose from "mongoose";
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

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        };

        const productsPurchased= await Product.findOne({
            _id: productId,
            customersPurchased: userId
        });

        if(!productsPurchased){
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

async function getAllRatingAndReviews(req, res){

    try{
        const allRatingAndReviews = await RatingAndReview.find().sort({ rating: '-1' }).populate({ path: 'user', select: 'firstName lastName profileImage' }).populate({ path: 'product', select: 'productName' });

        if(!allRatingAndReviews){
            return res.status(403).json({
                success: false,
                message: "All rating and reviews couldn't be fetched successfully!"
            });
        };

        return res.status(200).json({
            data: allRatingAndReviews,
            success: true,
            message: 'All rating and reviews fetched successfullY!'
        })
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function getAverageRating(req, res){

    const { productId } = req.params;

    if(!productId || !mongoose.Types.ObjectId(productId)){
        return res.status(400).json({
            success: false,
            message: "Invalid object id!"
        });
    };
    try{

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        };

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    product: mongoose.Types.ObjectId(productId) 
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating"
                    },
                    totalReviews: {
                        $sum: 1
                    }
                }
            }
        ]);

        const averageRating = result.length > 0 ? Math.round(result[0].averageRating * 10) / 10 : 0;
        
        const totalReviews = result.length > 0 ? result[0].totalReviews : 0;

        return res.status(200).json({
            averageRating,
            totalReviews,
            success: true,
            message: 'Average rating and total reviews!'
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};


export {
    createRatingAndReview,
    getAllRatingAndReviews,
    getAverageRating
};