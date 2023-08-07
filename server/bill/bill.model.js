import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 60,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    idUser: {
        type: String,
        required: true,
    },
    billDetail: [{
        idProduct: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    }],
}, {
    timestamps: true,
});

export default mongoose.model("Bill", billSchema);