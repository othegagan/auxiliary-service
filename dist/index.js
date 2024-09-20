"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./configs/env.js");
const errorHandler_1 = require("./utils/errorHandler.js");
const logger_1 = __importDefault(require("./utils/logger.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./configs/swagger.js");
const mainRouter_1 = __importDefault(require("./mainRouter.js"));
const enhancedLogger_1 = __importDefault(require("./utils/enhancedLogger.js"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('public'));
// Serve Swagger API docs
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs));
app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (body) {
        enhancedLogger_1.default.logRequestResponse(req, res, body);
        return originalJson.call(this, body);
    };
    next();
});
// Default
app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨🌎 Service 🤖 running 🌏✨🌈🦄'
    });
});
app.use('/', mainRouter_1.default);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger_1.default.info(`Server is running in ${env_1.env.NODE_ENV} mode on port ${PORT}`);
});
//# sourceMappingURL=index.js.map