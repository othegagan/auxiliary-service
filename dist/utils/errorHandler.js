import { ApiError } from './apiError.js';
import { ApiResponse } from './apiResponse.js';
import logger from './logger.js';
export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        const { statusCode, message, errors, data } = err;
        res.status(statusCode).json({
            statusCode,
            success: false,
            message,
            errors: errors || [],
            data: data || null
        });
        logger.error(message);
    }
    else {
        const statusCode = 500;
        const message = err.message || 'Internal Server Error';
        logger.error(message);
        res.status(statusCode).json(new ApiResponse(statusCode, null, message));
    }
};
