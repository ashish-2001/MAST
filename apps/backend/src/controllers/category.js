import { categoryValidator } from "../../../../packages/shared/schemas/categorySchema";
import { Category } from "../models/category";
import { User } from "../models/user";

async function createCategory(req, res){

    const userId = req.user.userId;

    try{

        const parsedResult = categoryCValidator.safeParse(req.body);

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        const { categoryName, categoryDescription } = parsedResult.data;

        const thumbnailImage = req.files.thumbnailImage;

        const uploadedImage = await uploadImageToCloudinary(
            thumbnailImage,
            process.env.FOLDER_NAME
        );

        if(!uploadedImage){
            return res.status(404).json({
                success: false,
                message: "Image could not be uploaded!"
            });
        };

        const existingCategory = await Category.find({
            categoryName: categoryName.trim()
        });

        if(existingCategory){
            return res.status(300).json({
                success: false,
                message: 'This category name already exists!'
            });
        };

        const categoryDetails = await Category.create({
            categoryName,
            categoryDescription
        });

        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category couldn't be created!"
            });
        };

        return res.status(200).json({
            data: categoryDetails,
            success: true,
            message: "Category created successfully!"
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};