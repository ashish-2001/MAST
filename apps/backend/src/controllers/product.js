import { productValidator } from "../../../../packages/shared/schemas/productSchema.js";
import { User } from "../models/user.js";
import { Category } from "../models/category.js";
import { Product } from "../models/products.js";

async function createProduct(req, res){

    const userId = req.user.userId;
    const { categoryId, productId } = req.params;

    try{
        const parsedResult = productValidator.safeParse(req.body);

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const { productName, productDescription, productPrice, productStock } = parsedResult.data;

        if(!categoryId){
            return res.status(404).json({
                success: false,
                message: 'Category not found!'
            });
        };

        const thumbnailImage = req.files.thumbnailImage;

        if(!thumbnailImage){
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

        const uploadedImage = await uploadImageToCloudinary(
            thumbnailImage,
            process.env.FOLDER_NAME || 'default'
        );

        const addedProduct = await Product.create({
            productName,
            productDescription,
            productPrice,
            productStock,
            thumbnailImage: uploadedImage.secure_url,
            categories: categoryId,
            createdBy: userDetails._id
        });

        if(!addedProduct){
            return res.status(403).json({
                success: false,
                message: "Product could't be created!"
            });
        };

        await User.findByIdAndUpdate(userId, 
            {
                $push: {
                    products: addedProduct._id
                }
            }, {
                new : true
            }
        );

        await Category.findByIdAndUpdate( categoryDetails._id, 
            {
                $push: {
                    products: addedProduct._id
                }
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Product created successfully!'
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function editProduct(req, res){

    const userId = req.user.userId;
    const { categoryId, productId } = req.params;
    try{

        if(!mongoose.Schema.Types.ObjectId.isValid(categoryId) || !mongoose.Schema.Types.ObjectId.isValid(productId)){
            return res.status(403).json({
                success: false,
                message: 'Invalid product and category id!'
            });
        };

        const parsedResult = productValidator.safeParse(req.body);

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: 'All fields are required!'
            });
        };

        const { productName, productDescription, productPrice } = parsedResult.data;

        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        if(product.createdBy.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: 'You are not allowed to edt the product details!'
            });
        };

        const category = await Category.findById(categoryId);

        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found!'
            });
        };

        const product = await Product.findById(productId);
        
        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        };

        if(req.files || req.files.thumbnailImage ){
            const thumbnailImage = req.files.thumbnailImage;

            const uploadedImage = await uploadImageToCloudinary(
                thumbnailImage,
                process.env.FOLDER_NAME || "products"
            );

            product.thumbnailImage = uploadedImage.secure_url;
        }

        product.productName = productName;
        product.productDescription = productDescription;
        product.productPrice = productPrice;
        product.productStock = productStock;
        product.categories = category._id;

        await product.save();

        const updatedProduct = await Product.findOne({ _id: productId }).populate("categories").populate("ratingAndReviews");

        return res.status(200).json({
            updatedProduct,
            product,
            success: true,
            message: 'Product details updated successfully!'
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function getAllProducts(req, res){

    try{
        const allProducts = await Products.find({}, 
            {
                productName: true,
                productDescription: true,
                productPrice: true,
                productStock: true,
                thumbnailImage: true,
                createdBy: true,
                customerPurchased: true
            }
        );

        return res.status(200).json({
            data: allProducts,
            success: true,
            message: 'All products fetched successfully!'
        })
    } catch(e){
        return req.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function getAllProductDetails(req, res){

    try{
        const productId = req.params;

        if(!productId){
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        };

        const productDetails = await Product.findById(productId).populate('createdBy').populate('categories').populate('customersPerchased').exec();

        if(!productDetails){
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        };

        return res.status(200).json({
            data: productDetails,
            success: false,
            message: 'Details of the product is fetched!'
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
}

async function deleteProduct(req, res){

    try{
        const userId = req.user.userId;

        const productId = req.params;

        const product = await Product.findById(productId);

        const user = await User.findById(userId);

        if(!productId){
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        };

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        };

        await Product.findByIdAndDelete(productId);

        await Category.findByIdAndUpdate(product.categories._id, {
            $pull: {
                products: productId
            }
        });

        await User.findByIdAndUpdate(product.createdBy._id, {
            $pull: {
                products: productId
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
        });

    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
};

async function searchProduct(req, res){

    try{
        const { searchQuery } = req.body;

        if(!searchQuery || searchQuery.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Search query is required!"
            });
        };

        const products = await Product.find({
            $or: [
                {
                    productName: {
                        $regex: searchQuery, $options: "i"
                    }
                },
                {
                    productDescription: {
                        $regex: searchQuery,
                        $options: "i"
                    }
                }
            ]
        }).populate("user").populate("category").("ratingAndReviews").exec();

        return res.status(200).json({
            data: products,
            success: true,
            message: "Product searched successfully!"
        })
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

export {
    createProduct,
    editProduct,
    getAllProducts,
    getAllProductDetails,
    deleteProduct,
    searchProduct
};