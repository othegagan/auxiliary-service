import { ApiError } from '@/utils/apiError';
import { ApiResponse } from '@/utils/apiResponse';
import logger from '@/utils/logger';
export const webhook = async (req, res) => {
    const body = req.body;
    try {
        const response = { ...body };
        res.status(200).json(new ApiResponse(200, response, 'Webhook received successfully'));
    }
    catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};