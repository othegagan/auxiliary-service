import { extractPolicyDetails, getItemDetails } from '@/controllers/insurance/insuranceHelpers';
import logger from '@/utils/logger';
import express, { Request, Response } from 'express';

const testRouter = express.Router();

testRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const id = body.id;
        const itemDetailsResponse = await getItemDetails(id);
        const extractedData = extractPolicyDetails(itemDetailsResponse.data);

        logger.info('Policy details extracted successfully:', extractedData);

        res.status(200).json({ statusCode: 200, message: 'Success', data: extractedData });
    } catch (error) {
        logger.error('Error extracting policy details:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ statusCode: 500, message: errorMessage, error });
    }
});

export default testRouter;
