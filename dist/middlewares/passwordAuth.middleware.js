import { env } from '@/configs/env';
import { ApiError } from '@/utils/apiError';
export const passwordAuth = (req, res, next) => {
    const { password } = req.body;
    if (password !== env.PASSWORD) {
        next(new ApiError(401, 'Unauthorized', [{ field: 'password', message: 'Invalid password' }]));
    }
    else {
        next();
    }
};
//# sourceMappingURL=passwordAuth.middleware.js.map