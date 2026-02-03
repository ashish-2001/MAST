import { User } from "../models/user.js";
import { Product } from "../models/products.js";

async function createOrder(req, res){

    const userId = req.user.userId;
    const items = req.body;

    try{
        const user = await User.findById(userId);

        if(!user){
            return res.status(403).json({
                success: false,
                message: "User not found!"
            });
        };

        const product = await Product.findById(items.product);

        if(!product){
            return res.status(403).json({
                success: false,
                message: "Product not found!"
            });
        };


    }catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

export {
    createOrder
};