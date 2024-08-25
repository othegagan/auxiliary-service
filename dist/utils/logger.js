import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json, colorize, printf } = format;
// Custom format for console logging with colors
const consoleLogFormat = printf(({ level, message, timestamp }) => {
    return ` ${level}: ${message}`;
});
// Create a Winston logger
const logger = createLogger({
    level: 'info',
    format: combine(colorize(), timestamp(), json()),
    transports: [
        new transports.Console({
            format: consoleLogFormat
        })
        // new transports.File({ filename: "app.log" }),
    ]
});
// Create a Morgan format for logging
const morganFormat = ':method :url :status :response-time ms';
// Create a custom Morgan stream to pipe log messages to Winston
export const morganMiddleware = morgan(morganFormat, {
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
export default logger;
