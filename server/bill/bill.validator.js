import { isValidNumberData, isValidStringData } from "../utils/validator.js";
import BillModel from "./bill.model.js";

const validateFullName = (data) => {
    const fullNameOptions = BillModel.schema.paths.fullName.options;

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

const validatePhone = (data) => {
    const phoneOptions = BillModel.schema.paths.phone.options;

    if (phoneOptions.required && phoneOptions.required === true) {
        if (!isValidStringData(
            data,
            phoneOptions.minLength ? phoneOptions.minLength : null,
            phoneOptions.maxLength ? phoneOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

const validateAddress = (data) => {
    const addressOptions = BillModel.schema.paths.address.options;

    if (addressOptions.required && addressOptions.required === true) {
        if (!isValidStringData(
            data,
            addressOptions.minLength ? addressOptions.minLength : null,
            addressOptions.maxLength ? addressOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

const validateTotalPrice = (data) => {
    const totalPriceOptions = BillModel.schema.paths.totalPrice.options;

    if (totalPriceOptions.required && totalPriceOptions.required === true) {
        if (!isValidNumberData(
            data,
            totalPriceOptions.min ? totalPriceOptions.min : null,
            totalPriceOptions.max ? totalPriceOptions.max : null)) {

            return false;
        }
    }

    return true;
}

const validateIdUser = (data) => {
    const idUserOptions = BillModel.schema.paths.idUser.options;

    if (idUserOptions.required && idUserOptions.required === true) {
        if (!isValidStringData(
            data,
            idUserOptions.minLength ? idUserOptions.minLength : null,
            idUserOptions.maxLength ? idUserOptions.maxLength : null)) {

            return false;
        }
    }

    return true;
}

export default {
    validateFullName,
    validatePhone,
    validateAddress,
    validateTotalPrice,
    validateIdUser,
}