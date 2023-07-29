
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}

function isEmptyString(value) {
    return typeof value === 'string' && value.trim() === '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isStringLengthInRange(str, minLength = null, maxLength = null) {
    const length = str.length;

    if (minLength && maxLength === null) {
        return length >= minLength;
    }

    if (maxLength && minLength === null) {
        return length <= maxLength;
    }

    return length >= minLength && length <= maxLength;
}

const isValidStringData = (value, minLength = null, maxLength = null) => {
    
    if (!value) {
        return false;
    }

    if (isNullOrUndefined(value)) {
        return false;
    }

    if (isEmptyString(value)) {
        return false;
    }

    if (minLength || maxLength) {
        if (!isStringLengthInRange(value, minLength, maxLength)) {
            return false;
        }
    }

    return true;
}

export { isNullOrUndefined, isEmptyString, isValidEmail, isValidStringData };