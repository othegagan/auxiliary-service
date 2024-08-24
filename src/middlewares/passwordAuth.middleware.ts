import { env } from '@/configs/env';
import { ApiError } from '@/utils/apiError';
import { NextFunction, Request, Response } from 'express';

export const passwordAuth = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (password !== env.PASSWORD) {
        next(new ApiError(401, 'Unauthorized', [{ field: 'password', message: 'Invalid password' }]));
    } else {
        next();
    }
};
