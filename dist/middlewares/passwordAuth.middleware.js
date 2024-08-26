"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordAuth = void 0;
const env_1 = require("../configs/env.js");
const apiError_1 = require("../utils/apiError.js");
const passwordAuth = (req, res, next) => {
    const { password } = req.body;
    if (password !== env_1.env.PASSWORD) {
        next(new apiError_1.ApiError(401, 'Unauthorized', [{ field: 'password', message: 'Invalid password' }]));
    }
    else {
        next();
    }
};
exports.passwordAuth = passwordAuth;
//# sourceMappingURL=passwordAuth.middleware.js.map