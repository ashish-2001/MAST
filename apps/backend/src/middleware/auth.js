import { jwt } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function auth(req, res, next){

    try{
        let token = req.cookies.toke || req.header("Authorization")?.replace("Bearer", " ") || req.body.token;

        if(token){
            return res.status(401).json({
                success: false,
                message: "Token is Missing!"
            });
        };
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();
    } catch(e){
        return res.status(401).json({
            success: false,
            message: e.message
        });
    };
};

async function isCustomer(req, res, next){

    try{
        if(req.user.role !== "Customer"){
            return res.status(403).json({
                success: false,
                message: "This is a protected route for customers only!"
            });
        };

        next();
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function IsAdmin(req, res, next){

    try{
        if(!req.user.role !== "Admin"){
            return res.status(403).json({
                success: false,
                message: "This is a protected route for admin only!"
            });
        };

        next();
    } catch(e){
        return res.status(500).json({
            success: false,
            message: "This is a protected route for admin only!"
        });
    };
};

export {
    auth,
    isCustomer,
    IsAdmin
}