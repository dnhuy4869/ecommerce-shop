import User from "../models/user.js";
import HttpStatus from "../constants/httpStatus.js"
import { isValidEmail, isValidStringData } from "../validators/validator.js";

const authController = {
    login: async (req, res) => {
        console.log(User.schema.paths.fullName.options?.asdsad);

        return res.status(200).json({
            message: "success",
        })
    },
    register: async (req, res) => {
        try {

            const data = {
                fullName: req.body.fullName,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            };

            // validate data
            const fullNameOptions = User.schema.paths.fullName.options;
            const usernameOptions = User.schema.paths.username.options;
            const passwordOptions = User.schema.paths.password.options;
            const emailOptions = User.schema.paths.email.options;

            if (fullNameOptions.required && fullNameOptions.required === true) {
                if (!isValidStringData(
                    data.fullName,
                    fullNameOptions.minLength ? fullNameOptions.minLength : null,
                    fullNameOptions.maxLength ? fullNameOptions.maxLength : null)) {

                    return res.status(HttpStatus.BAD_REQUEST).json({
                        message: "Họ tên không hợp lệ",
                    })
                }
            }

            if (usernameOptions.required && usernameOptions.required === true) {
                if (!isValidStringData(
                    data.username,
                    usernameOptions.minLength ? usernameOptions.minLength : null,
                    usernameOptions.maxLength ? usernameOptions.maxLength : null)) {

                    return res.status(HttpStatus.BAD_REQUEST).json({
                        message: "Tên tài khoản không hợp lệ",
                    })
                }
            }

            if (passwordOptions.required && passwordOptions.required === true) {
                if (!isValidStringData(
                    data.password,
                    passwordOptions.minLength ? passwordOptions.minLength : null,
                    passwordOptions.maxLength ? passwordOptions.maxLength : null)) {

                    return res.status(HttpStatus.BAD_REQUEST).json({
                        message: "Mật khẩu không hợp lệ",
                    })
                }
            }

            if (emailOptions.required && emailOptions.required === true) {
                if (!isValidStringData(
                    data.email,
                    emailOptions.minLength ? emailOptions.minLength : null,
                    emailOptions.maxLength ? emailOptions.maxLength : null)
                    || !isValidEmail(data.email)) {

                    return res.status(HttpStatus.BAD_REQUEST).json({
                        message: "Địa chỉ email không hợp lệ",
                    })
                }
            }

            // check if user is already exist
            const userByUsername = await User.findOne({ username: data.username });
            const userByEmail = await User.findOne({ email: data.email });

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

            const newUser = await new User(data);
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
    },
}

export default authController;