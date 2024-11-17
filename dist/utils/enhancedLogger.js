import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, json, colorize, printf, errors } = format;
// Custom format for console logging with colors
const consoleLogFormat = printf(({ level, message, timestamp, method, fullUrl, params, query, body, statusCode, responseBody, ...metadata }) => {
    let msg = `${timestamp} ${level}: ${message}`;
    if (method)
        msg += `\nmethod: ${method}`;
    if (fullUrl)
        msg += `\nurl: ${fullUrl}`; // Full URL instead of path
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
const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(errors({ stack: true }), // Log the full stack
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
    transports: [
        new transports.Console({
            format: combine(colorize(), consoleLogFormat)
        }),
        new DailyRotateFile({
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
export const morganMiddleware = morgan(morganFormat, {
    stream: {
        write: (message) => {
            logger.http('HTTP Request', { details: message.trim() });
        }
    }
});
// Helper to construct full URL
const getFullUrl = (req) => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
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
            fullUrl: getFullUrl(req), // Log full URL here
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
            fullUrl: getFullUrl(req), // Use full URL here
            params: req.params,
            query: req.query,
            body: req.body,
            statusCode: res.statusCode,
            responseBody: responseBody
        });
    }
};
export default enhancedLogger;
//# sourceMappingURL=enhancedLogger.js.map