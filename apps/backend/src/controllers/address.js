import { addressValidator } from "../../../../packages/shared/schemas/addressSchema";
import { Address } from "../models/address";
import { User } from "../models/user";


async function createAddress(req, res){

    const userId = req.user.userId;

    try{
        const parsedResult = addressValidator.safeParse(req.body);

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: 'All fields are required!'
            });
        };

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        const { address, landmark, city, state, pinCode } = parsedResult.data;

        const addressDetails = await Address.create({
            address: address,
            landmark: landmark,
            city: city,
            state: state,
            pinCode: pinCode
        });

        if(!addressDetails){
            return res.status(404).json({
                success: false,
                message: "Address cannot be created!"
            });
        };

        user.addresses.push(addressDetails._id);
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Address created successfully!'
        });

    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

async function editAddress(req, res){
    const userId = req.user.userId;
    const addressId = req.params;

    try{

        const parsedResult = addressValidator.safeParse(req.body);

        if(!parsedResult.success){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            });
        };

        const { address, landmark, city, state, pinCode } = parsedResult.data;

        const user = await User.findById(userId).populate({
            path: "addresses",
            select: "address landmark city state pinCode"
        });

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        const addresses = await Address.findById(addressId);

        if(!addresses){
            return res.status(404).json({
                success: false,
                message: "Address not found!"
            });
        };

        addresses.address = address;
        addresses.landmark = landmark;
        addresses.city = city;
        addresses.state = state;
        addresses.pinCode = pinCode;

        await addresses.save();

        const updatedAddress = await Address.findById({ _id: addressId });

        if(!updatedAddress){
            return res.status(404).json({
                success: false,
                message: "Address couldn't be updated!"
            });
        };

        return res.status(200).json({
            data: updatedAddress,
            success: true,
            message: "Address updated successfully!"
        });

    }catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

export {
    createAddress,
    editAddress,
    getAllAddresses,
    deleteAddress
};