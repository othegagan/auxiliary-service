"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, json, colorize, printf, errors } = winston_1.format;
// Custom format for console logging with colors
const consoleLogFormat = printf(({ level, message, timestamp, method, url, params, query, body, statusCode, responseBody, ...metadata }) => {
    let msg = `${timestamp} ${level}: ${message}`;
    if (method)
        msg += `\nmethod: ${method}`;
    if (url)
        msg += `\nurl: ${url}`;
    if (params)
        msg += `\nparams: ${JSON.stringify(params)}`;
    if (query)
        msg += `\nquery: ${JSON.stringify(query)}`;
    if (body)
        msg += `\nbody: ${JSON.stringify(body)}`;
    if (statusCode)
        msg += `\nstatusCode: ${statusCode}`;
    if (responseBody)
        msg += `\nresponse: ${JSON.stringify(responseBody)}`;
    if (Object.keys(metadata).length > 0) {
        msg += `\n${JSON.stringify(metadata)}`;
    }
    return msg;
});
// Create a Winston logger
const logger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(errors({ stack: true }), // Log the full stack
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), consoleLogFormat)
        }),
        new winston_daily_rotate_file_1.default({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});
// Add more detailed HTTP logging
const morganFormat = ':remote-addr :method :url :status :res[content-length] - :response-time ms';
exports.morganMiddleware = (0, morgan_1.default)(morganFormat, {
    stream: {
        write: (message) => {
            logger.http('HTTP Request', { details: message.trim() });
        }
    }
});
// Extend logger object with custom methods
const enhancedLogger = {
    ...logger,
    startTimer: () => {
        return process.hrtime();
    },
    endTimer: (start) => {
        const end = process.hrtime(start);
        return end[0] * 1000 + end[1] / 1000000;
    },
    logWithDuration: (level, message, start, metadata = {}) => {
        const duration = enhancedLogger.endTimer(start);
        logger.log(level, message, { ...metadata, duration: `${duration.toFixed(3)}ms` });
    },
    logRequest: (req) => {
        logger.info('Incoming request', {
            method: req.method,
            url: req.url,
            params: req.params,
            query: req.query,
            body: req.body
        });
    },
    logResponse: (res, body) => {
        logger.info('Outgoing response', {
            statusCode: res.statusCode,
            headers: res.getHeaders(),
            responseBody: body
        });
    },
    logRequestResponse: (req, res, responseBody) => {
        logger.info('Request-Response', {
            method: req.method,
            url: req.url,
            params: req.params,
            query: req.query,
            body: req.body,
            statusCode: res.statusCode,
            responseBody: responseBody
        });
    }
};
exports.default = enhancedLogger;
//# sourceMappingURL=enhancedLogger.js.map