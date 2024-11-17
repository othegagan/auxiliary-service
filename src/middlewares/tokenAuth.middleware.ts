import admin from '@/configs/firebase';
import { ApiError } from '@/utils/apiError';
import logger from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

const tokenAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json(new ApiError(401, 'Unauthorized', [{ field: 'Authorization', message: 'Firebase ID token is missing' }]));
        return; // Ensure we stop further execution here
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next(); // Pass control to the next middleware without returning anything
    } catch (error: any) {
        logger.error('Error verifying token:', error);
        res.status(403).json(new ApiError(403, 'Forbidden', [{ field: 'Authorization', message: error.message }])); // Send the response and stop here
    }
};

export default tokenAuth;
