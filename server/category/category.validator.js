import { isValidStringData } from "../utils/validator.js";
import CategoryModel from "./category.model.js";

const validateName = (data) => {
    const nameOptions = CategoryModel.schema.paths.name.options;

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

export default {
    validateName,
}