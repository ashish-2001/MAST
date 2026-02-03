import { User } from "../models/user";

async function createOrder(req, res){

    const userId = req.user.userId;
    const productId = req.params;

    try{
        const user = await User.findById(userId);

        if(!user){
            return res.status(403).json({
                success: false,
                message: "User not found!"
            });
        };

        const product = await Product.findById(productId);

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