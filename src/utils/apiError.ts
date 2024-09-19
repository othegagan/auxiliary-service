export class ApiError extends Error {
    statusCode: number;
    data: null;
    message: string;
    success: boolean;
    errors: any[];

    constructor(statusCode: number, message = 'Something went wrong', errors: any[] = [], stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message; // Ensure message is set as a field
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
