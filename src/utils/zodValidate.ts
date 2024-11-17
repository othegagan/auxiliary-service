import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
import { ApiError } from './apiError';

// Extend the Express Request interface to include `validatedData`
declare global {
    namespace Express {
        interface Request {
            validatedData?: any;
        }
    }
}
// Utility function to format Zod errors
const formatZodErrors = (error: ZodError) => {
    return error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message
    }));
};

// Middleware for validating request body with Zod schema
export const zodValidate = <T extends AnyZodObject>(schema: T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = (await schema.parseAsync(req.body)) as z.infer<T>;
            req.validatedData = validatedData; // Attach validated data to req object
            next(); // Move to the next middleware/controller
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = formatZodErrors(error);
                next(new ApiError(400, 'Validation failed', errorMessages)); // Send a 400 Bad Request error
            } else {
                next(new ApiError(500, 'Internal Server Error')); // Send a 500 Internal Server Error
            }
        }
    };
};

// Middleware for validating request query parameters with Zod schema
export const zodValidateQuery = <T extends AnyZodObject>(schema: T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate `req.query` against the Zod schema
            const validatedData = (await schema.parseAsync(req.query)) as z.infer<T>;
            req.validatedData = validatedData; // Attach validated data to req object
            next(); // Move to the next middleware/controller
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = formatZodErrors(error);
                next(new ApiError(400, 'Validation failed', errorMessages)); // Send a 400 Bad Request error
            } else {
                next(new ApiError(500, 'Internal Server Error')); // Send a 500 Internal Server Error
            }
        }
    };
};
