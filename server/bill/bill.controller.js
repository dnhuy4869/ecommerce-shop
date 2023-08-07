import HttpStatus from "../constants/http-status.js";
import UserModel from "../user/user.model.js";
import BillModel from "./bill.model.js";
import billValidator from "./bill.validator.js";

const getBillById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Id không hợp lệ",
            })
        }

        const bill = await BillModel.findById(req.params.id);
        if (!bill) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Id không tồn tại",
            })
        }

        return res.status(HttpStatus.OK).json(bill);
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const validateData = (data) => {

    if (!billValidator.validateFullName(data.fullName)) {
        return {
            isValid: false,
            message: "Họ tên không hợp lệ",
        }
    }

    if (!billValidator.validatePhone(data.phone)) {
        return {
            isValid: false,
            message: "Số điện thoại không hợp lệ",
        }
    }

    if (!billValidator.validatePhone(data.address)) {
        return {
            isValid: false,
            message: "Địa chỉ không hợp lệ",
        }
    }

    if (!billValidator.validateTotalPrice(data.totalPrice)) {
        return {
            isValid: false,
            message: "Tổng tiền không hợp lệ",
        }
    }

    if (!billValidator.validateIdUser(data.idUser)) {
        return {
            isValid: false,
            message: "Tổng tiền không hợp lệ",
        }
    }

    return {
        isValid: true,
        message: "",
    };
}

const addBill = async (req, res) => {
    try {
        const data = {
            fullName: req.body.fullName,
            phone: req.body.phone,
            address: req.body.address,
            totalPrice: req.body.totalPrice,
            idUser: req.body.idUser,
        }

        // validate data
        const validateRes = validateData(data);
        if (!validateRes.isValid) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: validateRes.message,
            })
        }

        const user = await UserModel.findById(data.idUser);
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Người dùng không tồn tại",
            })
        }

        const newBill = await new BillModel(data);
        const savedBill = await newBill.save();

        return res.status(HttpStatus.OK).json({
            message: "Thêm thành công",
            insertedId: savedBill._id,
        });
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

export default {
    getBillById,
    addBill,
}