import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 6,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
}, {
    timestamps: true,
});

export default mongoose.model("User", userSchema);