import { User } from "../models/user.jss";
import { Product } from "../models/products.js";
import { Order } from "../models/order.js";

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

        let totalAmount = 0;
        let processedItems = [];

        for ( let item of items ){
            const product = await Product.findById(items.product);

            if(!product){
                return res.status(403).json({
                    success: false,
                    message: "Product not found!"
                });
            };

            totalAmount += product.price * item.quantity;

            processedItems.push({
                productId: product._id,
                quantity: item.quantity,
                totalAmount,
                orderStatus: "Pending"
            });
        };

        const order = await Order.create({
            user: userId,
            items: processedItems,
            totalAmount,
            status: 'Pending'
        });

        return res.status(200).json({
            data: order,
            success: false,
            message: "Order placed successfully!"
        });

    }catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function cancelOrder(req, res){

}

async function updateOrderStatus(req, res){

}


export {
    createOrder
};