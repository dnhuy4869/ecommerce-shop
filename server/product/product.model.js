import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: "",
    },
    idCategory: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model("Product", productSchema);