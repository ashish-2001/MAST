import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({

    address: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    }
    
});

const Address = mongoose.model("Address", AddressSchema);

export {
    Address
}