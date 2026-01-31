import { signUpValidator } from "../../../../packages/shared/schemas/authSchema";
import { signInValidator } from "../../../../packages/shared/schemas/authSchema";
import { otpValidator } from "../../../../packages/shared/schemas/authSchema";
import { changePassword } from "../../../../packages/shared/schemas/authSchema";
import { Otp } from "../models/otp";
import { User } from "../models/user";
import bcrypt from 'bcrypt';

async function signup(req, res){
    
    try{
        const parsedResult = signUpValidator.safeParse();

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: 'All fields are required!'
            });
        };

        const { firstName, lastName, email, phoneNumber, password, confirmPassword } = parsedResult.data;

        if(password !== confirmPassword){
            return res.status(403).json({
                success: false,
                message: "Password and confirm password does not match!"
            })
        }

        const existingUser = await User.findOne({
            email,
            role
        });

        if(existingUser){
            return res.status(411).json({
                success: false,
                message: 'User already exists!'
            });
        };

        const otpRecord = await Otp.findOne({
            email,
            role,
            otp: otp.toString()
        }).sort({ createdAt: -1 });

        if(!otpRecord || otpRecord.otp !== otpRecord.toString()){
            return res.status(404).json({
                success: false,
                message: 'Invalid Otp!'
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            role,
            password: hashedPassword,
            profileImage: '',
            gender,
            dateOfBirth
        });

        await Otp.deleteOne({ _id: otpRecord._id });

        const token = jwt.sign({
            userId: user._id,
            role: user.role,
            email: user.email
        }, JWT_SECRET);

        return res.status(200).json({
            user,
            token,
            success: true,
            message: 'User registered successfully!'
        });

    } catch(e){
        return res.status().json({
            success: false,
            message: 'Internal server error!'
        });
    };
};