"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("../configs/firebase.js"));
const apiError_1 = require("../utils/apiError.js");
const logger_1 = __importDefault(require("../utils/logger.js"));
const tokenAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(new apiError_1.ApiError(401, 'Unauthorized', [{ field: 'Authorization', message: 'Firebase ID token is missing' }]));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = await firebase_1.default.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        logger_1.default.error('Error verifying token:', error);
        return res.status(403).json(new apiError_1.ApiError(403, 'Forbidden', [{ field: 'Authorization', message: error.message }]));
    }
};
exports.default = tokenAuth;
//# sourceMappingURL=tokenAuth.middleware.js.map