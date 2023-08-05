import HttpStatus from '../constants/http-status.js';
import authMethods from './auth.methods.js';

const verifyToken = (req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: "Unauthorized",
        })
    }

    const decodedToken = authMethods.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            requireRefresh: true,
            message: "Unauthorized",
        })
    }

    const tokenData = {
        username: decodedToken.payload.username,
        role: decodedToken.payload.role,
    }

    req.tokenData = tokenData;
    next();
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.tokenData.role === "admin") {
            next();
        }
        else {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: "You don't have permission to do this action"
            });
        }
    })
};

const verifyCustomer = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.tokenData.role === "admin" || req.tokenData.role === "customer") {
            next();
        }
        else {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: "You don't have permission to do this action"
            });
        }
    })
}

export default {
    verifyAdmin,
    verifyCustomer,
}