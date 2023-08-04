import HttpStatus from "../constants/http-status.js"
import CategoryModel from "./category.model.js";
import categoryValidator from "./category.validator.js";
import categoryMethods from "./category.methods.js";

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

        if (!categoryValidator.validateName(data.name)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Tên loại hàng không hợp lệ",
            })
        }

        if (data.name !== category.name) {
            const concurrent = await CategoryModel.findOne({ name: data.name });
            if (concurrent) {
                return res.status(HttpStatus.CONFLICT).json({
                    message: "Tên loại hàng đã tồn tại",
                })
            }
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

        categoryMethods.deleteImage(category);

        await category.deleteOne();

        //await Product.deleteMany({ idCategory: category._id });

        return res.status(HttpStatus.OK).json({
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

const deleteMultipleCategories = async (req, res) => {
    try {
        if (!req.body.ids) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Ids không hợp lệ",
            })
        }

        // Query the database for the categories that match the provided ids
        const categories = await CategoryModel.find({
            _id: {
                $in: req.body.ids
            }
        });

        // Delete the image files associated with each category
        categories.forEach(category => {
            categoryMethods.deleteImage(category);
        });

        await CategoryModel.deleteMany({
            _id: {
                $in: req.body.ids
            }
        });

        //await Product.deleteMany({ idCategory: category._id });

        return res.status(HttpStatus.OK).json({
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

const uploadImage = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Id không hợp lệ",
            })
        }

        const category = await CategoryModel.findById(req.body.id);
        if (!category) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Id không tồn tại",
            })
        }

        if (!req.files) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Files không hợp lệ",
            })
        }

        const { image } = req.files;
        if (!image) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Ảnh không hợp lệ",
            })
        }

        const fileName = `/upload/categories/${category._id}/${image.md5}/${image.name}`;
        if (fileName === category.imageUrl) {
            return res.status(HttpStatus.OK).json({
                message: "File đã tồn tại",
            });
        }

        categoryMethods.deleteImage(category);

        image.mv(`./public${fileName}`);

        await category.updateOne({ imageUrl: fileName });

        return res.status(HttpStatus.OK).json({
            message: "Upload thành công",
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
    deleteMultipleCategories,
    uploadImage,
}