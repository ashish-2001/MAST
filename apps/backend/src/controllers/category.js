import { categoryValidator } from "../../../../packages/shared/schemas/categorySchema";
import { Category } from "../models/category";
import { Product } from "../models/products";
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

async function addProductToCategory(req, res){

    const userId = req.user.userId;
    const { productId, categoryId } = req.params;

    try{
        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        };

        const category = await Category.findById(categoryId);

        if(!category){
            return res.status(404).json({
                success: false,
                message: "Category not found!"
            });
        };

        const user = await User.findById(userId);

        if(!user){
            return req.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        if(category.products.includes(productId)){
            return res.status(300).json({
                success: false,
                message: 'Product already exists in the category!'
            });
        };

        category.products.push(productId);
        await category.save();

        return res.status(200).json({
            success: false,
            message: "Product added to the category!"
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function editCategory(req, res){

    const userId = req.user.userId;
    const categoryId = req.params;

    try{
        const parsedResult = categoryValidator.safeParse(req.body);

        if(parsedResult.success){
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const { categoryName, categoryDescription } = parsedResult.data;

        const category = await Category.findById(categoryId);

        if(!category){
            return res.status(404).json({
                success: false,
                message: "Category not found!"
            });
        };

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        if(req.files || req.file.thumbnailImage){
            const thumbnailImage = req.files.thumbnailImage;

            const uploadedImage = await uploadImageToCloudinary(
                thumbnailImage,
                process.env.FOLDER_NAME
            )

            category.thumbnailImage = uploadedImage.secure_url
        };

        category.categoryName = categoryName;
        category.categoryDescription = categoryDescription;

        category.save();


        const updatedCategory = await Category.findByIdAndUpdate({ _id: categoryId }).populate('user');

        if(!updatedCategory){
            return res.status(404).json({
                success: false,
                message: "Category couldn't be updated successfully!"
            });
        };

        return res.status(200).json({
            data: updatedCategory,
            success: false,
            message: "Category updated successfully!"
        });

    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function getAllCategory(req, res){

    try{
        const allCategory = await Category.find({}, {
            categoryName: true,
            categoryDescription: true,
            thumbnailImage: true
        });

        if(!allCategory){
            return res.status(404).json({
                success: false,
                message: "Category couldn't be fetched successfully!"
            });
        };
        
        return res.status(200) .json({
            data: allCategory,
            success: true,
            message: "All categories fetched successfully!"
        })
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function deleteCategory(req, res){
    const userId = req.user.userId;

    const { categoryId, productId } = req.params;
    try{

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        const categoryId = await Category.findById(categoryId);

        if(!categoryId){
            return res.status(404).json({
                success: false,
                message: "Category not found!"
            });
        };

        if(category.products.length > 0){
            return res.status(400).json({
                success: false,
                message: "Remove product before deleting category!"
            });
        };

        await Product.updateMany(
            { 
                categories: categoryId
            },
            {
                $pull: {
                    categories: categoryId
                }
            }
        );

        await Category.findByIdAndDelete(categoryId);

    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

export {
    createCategory,
    addProductToCategory,
    editCategory,
    deleteCategory,
    getAllCategory
};
