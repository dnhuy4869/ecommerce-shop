import UserModel from "./user.model.js";
import { isValidEmail, isValidStringData } from "../utils/validator.js";

const validateFullName = (data) => {
    const fullNameOptions = UserModel.schema.paths.fullName.options;

    if (fullNameOptions.required && fullNameOptions.required === true) {
        if (!isValidStringData(
            data,
            fullNameOptions.minLength ? fullNameOptions.minLength : null,
            fullNameOptions.maxLength ? fullNameOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

const validateUsername = (data) => {
    const usernameOptions = UserModel.schema.paths.username.options;

    if (usernameOptions.required && usernameOptions.required === true) {
        if (!isValidStringData(
            data,
            usernameOptions.minLength ? usernameOptions.minLength : null,
            usernameOptions.maxLength ? usernameOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

const validatePassword = (data) => {
    const passwordOptions = UserModel.schema.paths.password.options;

    if (passwordOptions.required && passwordOptions.required === true) {
        if (!isValidStringData(
            data,
            passwordOptions.minLength ? passwordOptions.minLength : null,
            passwordOptions.maxLength ? passwordOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

const validateEmail = (data) => {
    const emailOptions = UserModel.schema.paths.email.options;

    if (emailOptions.required && emailOptions.required === true) {
        if (!isValidStringData(
            data,
            emailOptions.minLength ? emailOptions.minLength : null,
            emailOptions.maxLength ? emailOptions.maxLength : null)
            || !isValidEmail(data)) {

            return false;
        }
    }

    return true;
}

export default {
    validateFullName,
    validateUsername,
    validatePassword,
    validateEmail,
}