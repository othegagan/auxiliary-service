import admin from '../configs/firebase.js';
import { ApiError } from '../utils/apiError.js';
import logger from '../utils/logger.js';
const tokenAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(new ApiError(401, 'Unauthorized', [{ field: 'Authorization', message: 'Firebase ID token is missing' }]));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        logger.error('Error verifying token:', error);
        return res.status(403).json(new ApiError(403, 'Forbidden', [{ field: 'Authorization', message: error.message }]));
    }
};
export default tokenAuth;
