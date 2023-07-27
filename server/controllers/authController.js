import User from "../models/user.js";

const authController = {
    login: async (req, res) => {


        return res.status(200).json({
            message: "success",
        })
    },
    register: async (req, res) => {
        try {
            const cate = await User.findOne({ username: req.body.username });
            if (cate) {
                return res.status(403).json({
                    message: "Username is already exist",
                })
            }

            const newCate = await new User(req.body);
            await newCate.save();

            return res.status(200).json({
                message: "Registered successfully",
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                error: err,
            })
        }
    },
}

export default authController;