"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodValidate = void 0;
const zod_1 = require("zod");
const apiError_1 = require("./apiError.js");
// Utility function to format Zod errors
const formatZodErrors = (error) => {
    return error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message
    }));
};
// Middleware for validating request body with Zod schema
const zodValidate = (schema) => {
    return async (req, res, next) => {
        try {
            const validatedData = (await schema.parseAsync(req.body));
            req.validatedData = validatedData; // Attach validated data to req object
            next(); // Move to the next middleware/controller
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = formatZodErrors(error);
                next(new apiError_1.ApiError(400, 'Validation failed', errorMessages)); // Send a 400 Bad Request error
            }
            else {
                next(new apiError_1.ApiError(500, 'Internal Server Error')); // Send a 500 Internal Server Error
            }
        }
    };
};
exports.zodValidate = zodValidate;
//# sourceMappingURL=zodValidate.js.map