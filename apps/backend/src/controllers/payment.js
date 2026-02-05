import { Order } from "../models/order";
import { Product } from "../models/products";
import { User } from "../models/user";

async function capturePayment(req, res){

    const userId = req.user.userId;
    const { items } = req.body;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(403).json({
                success: false,
                message: "User not found!"
            });
        };

        if(!items || !Array.isArray(items) || items.length === 0){
            return res.status(400).json({
                success: false,
                message: 'items are required!'
            });
        };

        let totalAmount = 0;

        for (let item of items){
            const product = await Product.findById(item.product);

            if(!product){
                return res.status(404).json({
                    success: false,
                    message: "Product not found!"
                });
            };

            if(product.productStock < item.quantity){
                return res.status(403).json({
                    success: false,
                    message: `Insufficient stock for ${product.productName}`
                })
            }
            totalAmount += product.productPrice * item.quantity;
        };

        const razorpayOrder = await instance.orders.create({
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        });

        return res.status(200).json({
            success: true,
            message: "Product purchased successfully!",
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        });

    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function verifyPaymentAndCreateOrder(){

    const userId = req.user.userId

    try{
        const { razorpay_order_id, razorpay_payment_id, items, razorpay_signature } = req.body;

        if(!razorpay_order_id || !razorpay_payment_id || !items || razorpay_signature || !userId){
            return res.status(403).json({
                success: false,
                message: "Payment verification failed!" 
            });
        };

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");

        if(expectedSignature !== razorpay_signature){
            return res.status(403).json({
                success: false,
                message: "Invalid razorpay signature!"
            });
        };

        let totalAmount = 0;
        const processedItems = [];

        for(let item of items){
            const product = await Product.findById(item.product);

            if(!product){
                return res.status(404).json({
                    success: false,
                    message: "Product not found!"
                });
            };

            if(product.productStock < item.quantity){
                return res.status(403).json({
                    success: false,
                    message: `Insufficient product stock of ${product.productName}`
                });
            };

            const priceAtPurchase = product.productPrice;
            totalAmount += priceAtPurchase * item.quantity;

            processedItems.push({
                product: product._id,
                quantity: item.quantity,
                priceAtPurchase
            });

            product.productStock -+ item.quantity;
            product.customersPurchased.push(userId);
            await product.save(); 
        };
        
        const order = await Order.create({
            user: userId,
            items: processedItems,
            totalAmount,
            orderStatus: "Paid"
        });

        return res.status(200).json({
            data: order,
            success: true,
            message: "Products purchased successfully!"
        });

    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function sendPaymentSuccessfulEmail(req, res){

    const userId = req.user.userId;

    try{
        const { orderId, paymentId, amount } = req.body;

        if(!orderId || paymentId || !amount || !userId){
            return res.status(403).json({
                success: false,
                message: "All the details are required!"
            });
        };

        const customersPurchased = await User.findById(userId);

        if(!customersPurchased){
            return res.status(403).json({
                success: false,
                message: "Product is not purchased by customer!"
            });
        };

        await mailSender(
            customersPurchased.email,
            'Payment received',
            paymentSuccessfulEmail(
                `${customersPurchased.firstName} ${customersPurchased.lastName}`,
                amount / 100,
                paymentId,
                orderId
            )
        );

        return res.status(200).json({
            data: customersPurchased,
            success: true,
            message: "Email sent after payment successfully done!"
        });

    } catch(e){
        return res.status(500).json({
            success: false, 
            message: e.message
        })
    }
}

export {
    capturePayment,
    verifyPaymentAndCreateOrder,
    sendPaymentSuccessfulEmail
};