import { User } from "../models/user.jss";
import { Product } from "../models/products.js";
import { Order } from "../models/order.js";

async function cancelOrder(req, res){
    const userId = req.user.userId;
    const { orderId } = req.params;

    try{
        if(!mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({
                success: false,
                message: "Invalid order id!"
            });
        }

        const order = await Order.findById(orderId);

        if(!order){
            return res.status(403).json({
                success: false,
                message: "Order not found!"
            });
        };

        if(order.user.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: "Not authorized!"
            });
        };

        if(["Shipped", "Delivered"].includes(order.orderStatus)){
            return res.status(400).json({
                success: false,
                message: "Order cannot be cancelled now!"
            });
        };

        if(order.orderStatus === "Cancelled"){
            return res.status(400).json({
                success: false,
                message: "Order already cancelled!"
            });
        };

        for(item of order.items){
            await Product.findByIdAndUpdate( item.product,
                {
                    $inc: {
                        productStock: item.quantity
                    }
                }
            );
        };

        order.orderStatus = "Cancelled";
        await order.save();

        return res.status(200).json({
            success: false,
            message: "Order cancelled successfully!",
            data: order
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function exchangeOrder(req, res){
    const userId = req.user.userId;
    const { orderId } = req.params;
    const { items } = req.body;

    try{
        const order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found!"
            });
        };

        if(order.user.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: "Not authorized!"
            });
        };

        if(order.orderStatus !== "Delivered"){
            return res.status(400).json({
                success: false,
                message: "Only delivered order can be exchanged!"
            });
        };

        if(!items || items.length === 0){
            return res.status(400).json({
                success: false,
                message: "Exchange items required!"
            });
        };

        let totalAmount = 0;
        const processedItems = [];

        for(const item of items){
            const product = await Product.findById(item.product);

            if(!product){
                return res.status(404).json({
                    success: false,
                    message: "Product not found!"
                });
            }

            if(product.productStock < item.quantity){
                return res.status(400).json({
                    success: false,
                    message: "Insufficient stock!"
                });
            };

            totalAmount += product.productPrice * item.quantity;
            processedItems.push({
                product: product._id,
                quantity: item.quantity,
                priceAtPurchase: product.productPrice
            });

            product.productStock -= item.quantity;
            await product.save();
        }

        order.orderStatus = "Cancelled";
        await order.save();

        const newOrder = await Order.create({
            user: userId,
            items: processedItems,
            totalAmount,
            orderStatus: "Paid"
        });

        return res.status(201).json({
            success: false,
            message: "Order exchanged successfully!",
            oldOrder: order._id,
            newOrder
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function updateOrderStatus(req, res){
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const allowed = ["Shipped", "Delivered"];

    try{
        const order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found!"
            });
        };

        if(order.orderStatus === "Cancelled"){
            return res.status(400).json({
                success: false,
                message: "Cancelled orders cannot be updated!"
            });
        };

        if(order.orderStatus === "Paid" && orderStatus === "Shipped" || order.orderStatus === "Shipped" && orderStatus === "Delivered"){
            order.orderStatus = orderStatus;
            await order.save();
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid status transition!"
            });
        };

        return res.status(200).json({
            success: true,
            message: "Order status updated",
            order
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};


export {
    cancelOrder,
    exchangeOrder,
    updateOrderStatus
};