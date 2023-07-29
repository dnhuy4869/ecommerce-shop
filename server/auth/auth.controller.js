import UserModel from "../user/user.model.js";
import HttpStatus from "../constants/http-status.js"
import userValidator from "../user/user.validator.js";
import bcrypt from 'bcrypt';

const login = async (req, res) => {
    try {

        const data = {
            username: req.body.username,
            password: req.body.password,
        }

        // validate data

        if (!userValidator.validateUsername(data.username)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Tên tài khoản không hợp lệ",
            })
        }

        if (!userValidator.validatePassword(data.password)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Mật khẩu không hợp lệ",
            })
        }

        const user = await UserModel.findOne({
            username: data.username,
        });

        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Tên tài khoản không tồn tại",
            })
        }

        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: "Mật khẩu không chính xác",
            })
        }

        return res.status(HttpStatus.OK).json(user);
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
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
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Họ tên không hợp lệ",
            })
        }

        if (!userValidator.validateUsername(data.username)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Tên tài khoản không hợp lệ",
            })
        }

        if (!userValidator.validatePassword(data.password)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Mật khẩu không hợp lệ",
            })
        }

        if (!userValidator.validateEmail(data.email)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Địa chỉ email không hợp lệ",
            })
        }

        // check if user is already exist
        const userByUsername = await UserModel.findOne({ username: data.username });
        const userByEmail = await UserModel.findOne({ email: data.email });

        if (userByUsername) {
            return res.status(HttpStatus.CONFLICT).json({
                message: "Tên tài khoản đã tồn tại",
            });
        }

        if (userByEmail) {
            return res.status(HttpStatus.CONFLICT).json({
                message: "Địa chỉ email đã tồn tại",
            });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(data.password, salt);

        data.password = hashedPassword;

        const newUser = await new UserModel(data);
        await newUser.save();

        return res.status(HttpStatus.OK).json({
            message: "Đăng ký thành công",
        });
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
};

export default {
    login,
    register,
};