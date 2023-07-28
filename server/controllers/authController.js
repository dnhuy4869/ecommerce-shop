import User from "../models/user.js";
import httpStatus from "../constants/httpStatus.js"
import { isValidEmail, isValidStringData } from "../validators/validator.js";
import userValidator from "../validators/userValidator.js";

const login = async (req, res) => {
    try {
        
        const data = {
            username: req.body.username,
            password: req.body.password,
        }

        // validate data

        if (!userValidator.validateUsername(data.username)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Tên tài khoản không hợp lệ",
            })
        }

        if (!userValidator.validatePassword(data.password)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Mật khẩu không hợp lệ",
            })
        }

        const user = await User.findOne({ 
            username: data.username,
            password: data.password,
        });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Tên tài khoản hoặc mật khẩu không chính xác",
            })
        }

        return res.status(httpStatus.OK).json(user);
    }
    catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
};

const register = async (req, res) => {
    try {

        const data = {
            fullName: req.body.fullName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        };

        // validate data

        if (!userValidator.validateFullName(data.fullName)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Họ tên không hợp lệ",
            })
        }

        if (!userValidator.validateUsername(data.username)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Tên tài khoản không hợp lệ",
            })
        }

        if (!userValidator.validatePassword(data.password)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Mật khẩu không hợp lệ",
            })
        }

        if (!userValidator.validateEmail(data.email)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Địa chỉ email không hợp lệ",
            })
        }

        // check if user is already exist
        const userByUsername = await User.findOne({ username: data.username });
        const userByEmail = await User.findOne({ email: data.email });

        if (userByUsername) {
            return res.status(httpStatus.CONFLICT).json({
                message: "Tên tài khoản đã tồn tại",
            });
        }

        if (userByEmail) {
            return res.status(httpStatus.CONFLICT).json({
                message: "Địa chỉ email đã tồn tại",
            });
        }

        const newUser = await new User(data);
        await newUser.save();

        return res.status(httpStatus.OK).json({
            message: "Đăng ký thành công",
        });
    }
    catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
};

export default {
    login,
    register,
};