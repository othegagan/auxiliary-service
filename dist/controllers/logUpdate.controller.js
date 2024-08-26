import { env } from '../configs/env.js';
import logger from '../utils/logger.js';
import axios from 'axios';
export default async function logUpdate(msg) {
    const url = `${env.BUNDEE_BOOKING_SERVICE_BASE_URL}/v1/booking/insertErrorLog`;
    const payload = {
        logLevel: 'info',
        moduleName: 'Duoblebooking handler',
        apiName: 'automated trip sync between Turo and bundee',
        logMessage: msg
    };
    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env.BUNDEE_AUTH_TOKEN
    };
    try {
        const response = await axios.post(url, payload, { headers: headers });
        logger.info(response.data);
    }
    catch (error) {
        logger.error(error);
    }
}
