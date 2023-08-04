import HttpStatus from "../constants/http-status.js"
import CategoryModel from "./category.model.js";
import categoryValidator from "./category.validator.js";

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();

        return res.status(HttpStatus.OK).json(categories);
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const getCategoryById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Id không hợp lệ",
            })
        }

        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Id không tồn tại",
            })
        }

        return res.status(HttpStatus.OK).json(category);
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const addCategory = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
        }
    
        // validate data
    
        if (!categoryValidator.validateName(data.name)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Tên loại hàng không hợp lệ",
            })
        }
    
        const category = await CategoryModel.findOne({ name: data.name });
        if (category) {
            return res.status(HttpStatus.CONFLICT).json({
                message: "Tên loại hàng đã tồn tại",
            })
        }
    
        const newCategory = await new CategoryModel(data);
        const savedCategory = await newCategory.save();
    
        return res.status(HttpStatus.OK).json({
            message: "Thêm thành công",
            insertedId: savedCategory._id,
        });
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const editCategory = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Id không hợp lệ",
            })
        }

        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Id không tồn tại",
            })
        }

        const data = {
            name: req.body.name,
        }

        // validate data

        if (!categoryValidator.validateUsername(data.name)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Tên loại hàng không hợp lệ",
            })
        }

        const concurrent = await CategoryModel.findOne({ name: data.name });
        if (concurrent) {
            return res.status(HttpStatus.CONFLICT).json({
                message: "Tên loại hàng đã tồn tại",
            })
        }

        await category.updateOne(data);

        return res.status(HttpStatus.OK).json({
            message: "Cập nhật thành công",
        });
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Id không hợp lệ",
            })
        }

        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Id không tồn tại",
            })
        }

        await category.deleteOne();

        //await Product.deleteMany({ idCategory: category._id });

        return res.status(200).json({
            message: "Xóa thành công",
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
    getAllCategories,
    getCategoryById,
    addCategory,
    editCategory,
    deleteCategory,
}