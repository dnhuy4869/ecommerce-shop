import HttpStatus from "../constants/http-status.js"
import ProductModel from "./product.model.js";
import productValidator from "./product.validator.js";
import productMethods from "./product.methods.js";
import CategoryModel from "../category/category.model.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();

        return res.status(HttpStatus.OK).json(products);
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const getProductById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Id không hợp lệ",
            })
        }

        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Id không tồn tại",
            })
        }

        return res.status(HttpStatus.OK).json(product);
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const getProductsByCategory = async (req, res) => {
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

        const products = await ProductModel.find({ idCategory: category._id });

        return res.status(HttpStatus.OK).json(products);
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const validateData = (data) => {

    if (!productValidator.validateName(data.name)) {
        return {
            isValid: false,
            message: "Tên sản phẩm không hợp lệ",
        }
    }

    if (!productValidator.validatePrice(data.price)) {
        return {
            isValid: false,
            message: "Giá sản phẩm không hợp lệ",
        }
    }

    if (!productValidator.validateDescription(data.description)) {
        return {
            isValid: false,
            message: "Mô tả sản phẩm không hợp lệ",
        }
    }

    if (!productValidator.validateIdCategory(data.idCategory)) {
        return {
            isValid: false,
            message: "Id loại hàng không hợp lệ",
        }
    }

    return {
        isValid: true,
        message: "",
    };
}

const addProduct = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            idCategory: req.body.idCategory,
        }
    
        // validate data
        const validateRes = validateData(data);
        if (!validateRes.isValid) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: validateRes.message,
            })
        }
    
        const newProduct = await new ProductModel(data);
        const savedProduct = await newProduct.save();
    
        return res.status(HttpStatus.OK).json({
            message: "Thêm thành công",
            insertedId: savedProduct._id,
        });
    }
    catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const editProduct = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Id không hợp lệ",
            })
        }

        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Id không tồn tại",
            })
        }

        const data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            idCategory: req.body.idCategory,
        }

        // validate data
        const validateRes = validateData(data);
        if (!validateRes.isValid) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: validateRes.message,
            })
        }

        await product.updateOne(data);

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

const deleteProduct = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Id không hợp lệ",
            })
        }

        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Id không tồn tại",
            })
        }

        productMethods.deleteImage(product);

        await product.deleteOne();

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

const deleteMultipleProducts = async (req, res) => {
    try {
        if (!req.body.ids) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Ids không hợp lệ",
            })
        }

        const products = await ProductModel.find({
            _id: {
                $in: req.body.ids
            }
        });

        products.forEach(category => {
            productMethods.deleteImage(category);
        });

        await ProductModel.deleteMany({
            _id: {
                $in: req.body.ids
            }
        });

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

        const product = await ProductModel.findById(req.body.id);
        if (!product) {
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

        const fileName = `/upload/products/${product._id}/${image.md5}/${image.name}`;
        if (fileName === product.imageUrl) {
            return res.status(HttpStatus.OK).json({
                message: "File đã tồn tại",
            });
        }

        productMethods.deleteImage(product);

        image.mv(`./public${fileName}`);

        await product.updateOne({ imageUrl: fileName });

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
    getAllProducts,
    getProductById,
    getProductsByCategory,
    addProduct,
    editProduct,
    deleteProduct,
    deleteMultipleProducts,
    uploadImage,
}