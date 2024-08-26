"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiError_1 = require("./apiError.js");
const apiResponse_1 = require("./apiResponse.js");
const logger_1 = __importDefault(require("./logger.js"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof apiError_1.ApiError) {
        const { statusCode, message, errors, data } = err;
        res.status(statusCode).json({
            statusCode,
            success: false,
            message,
            errors: errors || [],
            data: data || null
        });
        logger_1.default.error(message);
    }
    else {
        const statusCode = 500;
        const message = err.message || 'Internal Server Error';
        logger_1.default.error(message);
        res.status(statusCode).json(new apiResponse_1.ApiResponse(statusCode, null, message));
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map