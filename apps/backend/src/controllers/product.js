import { success } from "zod";
import { productValidator } from "../../../../packages/shared/schemas/productSchema";
import { User } from "../models/user";
import { Category } from "../models/category";

+async function createProduct(req, res){

    const userId = req.user.userId;

    try{
        const parsedResult = productValidator.safeParse(req.body);

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const { productName, productDescription, productPrice, thumbnailImage, productStock, categoryId } = parsedResult.data;

        const thumbnail = req?.files?.thumbnailImage;

        if(!thumbnail){
            return res.status(404).json({
                success: false,
                message: "Thumbnail image of the product is missing!"
            });
        };

        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: 'User details not found!'
            });
        };

        const categoryDetails = await Category.findById(categoryId);

        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category not found!"
            });
        };


    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
}