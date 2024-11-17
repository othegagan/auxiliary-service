import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';
import express from 'express';

const getLogsRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

getLogsRouter.get('/', async (req: express.Request, res: express.Response) => {
    // Default date is today's date in YYYY-MM-DD format
    const date = (req.query.date as string) || new Date().toISOString().split('T')[0];

    // Construct the log filename
    const logFileName = `application-${date}.log`;

    try {
        // Path to the log file
        const logFilePath = path.join(__dirname, '..', '..', 'logs', logFileName);

        // Read the log file content
        const data = await fs.readFile(logFilePath, 'utf8');

        // Parse and filter logs
        const logs = data
            .split('\n')
            .filter((line) => line.trim() !== '') // Filter out empty lines
            .map((line) => {
                try {
                    return JSON.parse(line); // Parse each line as JSON
                } catch (parseErr) {
                    console.warn('Invalid JSON format:', line);
                    return { message: 'Invalid log format', content: line };
                }
            })
            // Exclude logs from the default route
            .filter((log) => {
                return !(log.url === '/' && log.method === 'GET' && log.responseBody?.message?.includes('Service 🤖 running in'));
            });

        res.json(logs);
    } catch (err: unknown) {
        if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
            res.status(404).json({ message: `Log file not found for the specified date: ${logFileName}` });
        } else {
            console.error('Error reading log file:', err);
            res.status(500).json({ message: 'Error reading log file' });
        }
    }
});

export default getLogsRouter;
