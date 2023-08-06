import { isValidNumberData, isValidStringData } from "../utils/validator.js";
import ProductModel from "./product.model.js";

const validateName = (data) => {
    const nameOptions = ProductModel.schema.paths.name.options;

    if (nameOptions.required && nameOptions.required === true) {
        if (!isValidStringData(
            data,
            nameOptions.minLength ? nameOptions.minLength : null,
            nameOptions.maxLength ? nameOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

const validatePrice = (data) => {
    const priceOptions = ProductModel.schema.paths.price.options;

    if (priceOptions.required && priceOptions.required === true) {
        if (!isValidNumberData(
            data,
            priceOptions.min ? priceOptions.min : null,
            priceOptions.max ? priceOptions.max : null)) {

            return false;
        }
    }

    return true;
}

const validateDescription = (data) => {
    const descriptionOptions = ProductModel.schema.paths.description.options;

    if (descriptionOptions.required && descriptionOptions.required === true) {
        if (!isValidStringData(
            data,
            descriptionOptions.minLength ? descriptionOptions.minLength : null,
            descriptionOptions.maxLength ? descriptionOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

const validateIdCategory = (data) => {
    const idCategoryOptions = ProductModel.schema.paths.idCategory.options;

    if (idCategoryOptions.required && idCategoryOptions.required === true) {
        if (!isValidStringData(
            data,
            idCategoryOptions.minLength ? idCategoryOptions.minLength : null,
            idCategoryOptions.maxLength ? idCategoryOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

export default {
    validateName,
    validatePrice,
    validateDescription,
    validateIdCategory,
}