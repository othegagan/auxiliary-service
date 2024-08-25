import { env } from '@/configs/env';
import { ApiError } from '@/utils/apiError';
import { ApiResponse } from '@/utils/apiResponse';
import logger from '@/utils/logger';
import axios from 'axios';
export const insurance = async (req, res) => {
    const { firstName, lastName, email, externalId, phoneNumber } = req.validatedData;
    try {
        const response = await createNewIndividual(firstName, lastName, email, externalId, phoneNumber);
        res.status(200).json(new ApiResponse(200, response, 'Individual created successfully'));
    }
    catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
async function createNewIndividual(firstName, lastName, email, externalId, phoneNumber) {
    try {
        const url = `${env.MEASUREONE_BASE_URL}/v3/individuals/new`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.MEASUREONE_BRARER_TOKEN}`,
                Accept: 'application/json',
                version: env.MEASUREONE_API_VERSION
            }
        };
        const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            external_id: externalId,
            phone_number: phoneNumber
        };
        const response = await axios.post(url, payload, config);
        return response.data;
    }
    catch (error) {
        logger.error(error);
        throw new ApiError(500, error.message, error);
    }
}
async function getDetailsOfIndividual(id) {
    try {
        const url = `${env.MEASUREONE_BASE_URL}/v3/individuals/get_by_id`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.MEASUREONE_BRARER_TOKEN}`,
                Accept: 'application/json',
                version: env.MEASUREONE_API_VERSION
            }
        };
        const payload = { id: id };
        const response = await axios.post(url, payload, config);
        return response.data;
    }
    catch (error) {
        logger.error(error);
        throw new ApiError(500, error.message, error);
    }
}
