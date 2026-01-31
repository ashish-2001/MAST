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

async function signin(req, res){

    try{
        const parsedResult = signInValidator.safeParse();

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const { email, password } = parsedResult.data;

        const user = await User.findOne({
            email
        });

        if(!user){
            return res.status(403).json({
                success: false,
                message: "User not found!"
            });
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(isPasswordMatch){
            const token = jwt.sign({
                userId: user._id,
                role: user.role,
                email: user.email
            }, JWT_SECRET);

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            return res.cookie('token', token, options).status(200).json({
                success: true,
                message: "Logged in successfully",
                user,
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect!'
            });
        };
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function sendOtp(req, res){

    try{
        const parsedResult = otpValidator.safeParse();

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const { email, role } = parsedResult.data;

        const userExists = await User.findOne({
            email,
            role
        });

        if(userExists){
            return res.status(403).json({
                success: false,
                message: 'User already exists!'
            });
        };

        let otp;
        let otpExists;

        do { otp = otpGenerator.generate(6, {
                uppercaseAlphabets: false,
                lowercaseAlphabets: false,
                specialChars: false
            }) ;
            otpExists = await Otp.findOne({
                otp, role
            });
        } while(otpExists);

        await Otp.create({ email, otp, role });

        return res.status(200).json({
            success: true,
            message: "Otp sent successfully",
            otp
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function changePassword(req, res){

    try{
        const userDetails = await User.findById(req.user.userId);

        if(!userDetails){
            return res.status(403).json({
                success: false,
                message: "User not found!"
            });
        };

        const parsedResult = changePasswordValidator.safeParse();

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const { oldPassword, newPassword, confirmNewPassword } = parsedResult.data;

        if(newPassword !== confirmNewPassword){
            return res.status(403).json({
                success: false,
                message: 'New password and confirm new password should match!'
            });
        };

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if(oldPassword === newPassword){
            return res.status(401).json({
                success: false,
                message: "Old password and new password cannot be same!"
            });
        };

        if(!isPasswordMatch){
            return res.status(404)({
                success: false,
                message: "Old Password and new password does not match!"
            });
        };

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.userId,
            {
                password: hashedPassword
            },
            {
                new: true
            }
        );

        try{

            const mailResponse = await mailSender(
                updatedUserDetails.email,
                "Password updated successfully",
                passwordUpdate(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName}`
                )
            );

            console.log("Email sent successfully", mailResponse);
        } catch(e){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        };

    return res.status(200).json({
        success: true,
        message: "Password changed successfully!"
    });

    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

export {
    signup,
    signin,
    sendOtp,
    changePassword
};