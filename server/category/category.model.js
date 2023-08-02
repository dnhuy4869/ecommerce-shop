import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 255,
    },
    imageUrl: {
        type: String,
        default: "",
    }
}, {
    timestamps: true,
});

export default mongoose.model("Category", categorySchema);