import { addressValidator } from "../../../../packages/shared/schemas/addressSchema.js";
import { Address } from "../models/address.js";
import { User } from "../models/user.js";


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
    const { addressId } = req.params;

    if(!mongoose.Types.objectId.isValid(addressId)){
        return res.status(403).json({
            success: false,
            message: "Address id is invalid!"
        });
    };

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
};

async function getAllAddresses(){

    const userId = req.user.userId;
    const { addressId } = req.params;

    if(!mongoose.Types.objectId.isValid(addressId)){
        return res.status(403).json({
            success: false,
            message: "Address is invalid!"
        });
    };

    try{
        const allAddresses = await User.findById(userId).populate({
            path: "addresses",
            select: "address landmark city state pinCode"
        });

        if(!allAddresses){
            return res.status(404).json({
                success: false,
                message: "Addresses couldn't be fetched successfully!"
            });
        };

        return res.status(200).json({
            success: false,
            message: "Addresses fetched successfully!",
            data: allAddresses
        });
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };
};

async function deleteAddress(req, res){
    const userId = req.user.userId;
    const { addressId } = req.params;

    if(!mongoose.Types.objectId.isValid(addressId)){
        return res.status(403).json({
            success: false,
            message: "Address id is invalid!"
        });
    };

    try{
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        };

        const address = await Address.findById(addressId);

        if(!address){
            return res.status(404).json({
                success: false,
                message: "Address not found!"
            });
        };

        await User.findByIdAndUpdate(userId, {
            $pull: {
                addresses: addressId
            }
        });

        await Address.findByIdAndDelete(addressId);

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully!"
        });
    }catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        });
    };

};

export {
    createAddress,
    editAddress,
    getAllAddresses,
    deleteAddress
};