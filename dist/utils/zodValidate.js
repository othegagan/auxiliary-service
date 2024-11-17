import { ZodError } from 'zod';
import { ApiError } from './apiError';
// Utility function to format Zod errors
const formatZodErrors = (error) => {
    return error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message
    }));
};
// Middleware for validating request body with Zod schema
export const zodValidate = (schema) => {
    return async (req, res, next) => {
        try {
            const validatedData = (await schema.parseAsync(req.body));
            req.validatedData = validatedData; // Attach validated data to req object
            next(); // Move to the next middleware/controller
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = formatZodErrors(error);
                next(new ApiError(400, 'Validation failed', errorMessages)); // Send a 400 Bad Request error
            }
            else {
                next(new ApiError(500, 'Internal Server Error')); // Send a 500 Internal Server Error
            }
        }
    };
};
// Middleware for validating request query parameters with Zod schema
export const zodValidateQuery = (schema) => {
    return async (req, res, next) => {
        try {
            // Validate `req.query` against the Zod schema
            const validatedData = (await schema.parseAsync(req.query));
            req.validatedData = validatedData; // Attach validated data to req object
            next(); // Move to the next middleware/controller
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = formatZodErrors(error);
                next(new ApiError(400, 'Validation failed', errorMessages)); // Send a 400 Bad Request error
            }
            else {
                next(new ApiError(500, 'Internal Server Error')); // Send a 500 Internal Server Error
            }
        }
    };
};
//# sourceMappingURL=zodValidate.js.map