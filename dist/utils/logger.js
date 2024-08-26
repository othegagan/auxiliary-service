"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("winston");
const { combine, timestamp, json, colorize, printf } = winston_1.format;
// Custom format for console logging with colors
const consoleLogFormat = printf(({ level, message, timestamp }) => {
    return ` ${level}: ${message}`;
});
// Create a Winston logger
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(colorize(), timestamp(), json()),
    transports: [
        new winston_1.transports.Console({
            format: consoleLogFormat
        })
        // new transports.File({ filename: "app.log" }),
    ]
});
// Create a Morgan format for logging
const morganFormat = ':method :url :status :response-time ms';
// Create a custom Morgan stream to pipe log messages to Winston
exports.morganMiddleware = (0, morgan_1.default)(morganFormat, {
    stream: {
        write: (message) => {
            const [method, url, status, responseTime] = message.trim().split(' ');
            const logObject = {
                method,
                url,
                status,
                responseTime: responseTime.replace('ms', '')
            };
            logger.info('HTTP Request', logObject);
        }
    }
});
exports.default = logger;
//# sourceMappingURL=logger.js.map