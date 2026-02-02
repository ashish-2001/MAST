import { categoryValidator } from "../../../../packages/shared/schemas/categorySchema";
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

        const { categoryName, categoryDescription } = parsedResult.data;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };


    }
}