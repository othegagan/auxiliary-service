import { env } from '@/configs/env';
import { handleResponse } from '@/utils/apiResponse';
import logger from '@/utils/logger';
import axios from 'axios';

export async function getUserById(userId: number) {
    const url = `${env.BUNDEE_USER_MANAGEMENT_BASE_URL}/v1/user/getUserById`;

    const payload = {
        iduser: userId
    };

    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env.BUNDEE_AUTH_TOKEN
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        logger.info(response.data);
        return handleResponse(response.data);
    } catch (error) {
        logger.error(error);
        return {
            success: false,
            data: null,
            message: error.message
        };
    }
}

export async function updateInsuranceDetails(payload: any) {
    const url = `${env.BUNDEE_USER_MANAGEMENT_BASE_URL}/v1/user/createInsuranceDetail`;

    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env.BUNDEE_AUTH_TOKEN
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        logger.info(response.data);
        return handleResponse(response.data);
    } catch (error) {
        logger.error(error);
        return {
            success: false,
            data: null,
            message: error.message
        };
    }
}
