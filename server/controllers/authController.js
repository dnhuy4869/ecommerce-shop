const User = require("../models/user");

const authController = {
    login: async (req, res) => {
        

        return res.status(200).json({
            message: "success",
        })
    },
    register: async (req, res) => {
        

        return res.status(200).json({
            message: "success",
        })
    },
}

module.exports = authController;