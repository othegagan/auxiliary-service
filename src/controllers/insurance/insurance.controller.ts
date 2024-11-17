import { env } from '@/configs/env';
import { CreateNewIndividualPayload, insranceVerificationStatus } from '@/types';
import { ApiError } from '@/utils/apiError';
import { ApiResponse } from '@/utils/apiResponse';
import logger from '@/utils/logger';
import axios from 'axios';
import { Request, Response } from 'express';
import { getUserById, updateInsuranceDetails } from '../others/user.controller';
import {
    SOURCE_DATA_TYPE,
    createNewDataRequest,
    generateMeasureOneAccessToken,
    generateMeasureOneInvitationLink,
    generateMeasureOnePublicAccessToken,
    getItemDetails,
    getItemsOfIndividualOnDataRequest
} from './insuranceHelpers';

const authorizationBuffer = Buffer.from(`${env.MEASUREONE_CLIENT_ID}:${env.MEASUREONE_SECRET}`);
const authorization = `Basic ${authorizationBuffer.toString('base64')}`;

export async function generateMeasureOneAccessTokenController(req: Request, res: Response) {
    try {
        const resp = await generateMeasureOneAccessToken();

        const data = await resp.data;
        res.status(200).json(new ApiResponse(200, data, 'Access token generated successfully'));
    } catch (error) {
        logger.error(error);
        res.status(500).json(new ApiError(500, error.message, error));
    }
}

export async function generateMeasureOnePublicAccessTokenController(req: Request, res: Response) {
    try {
        const data = await generateMeasureOnePublicAccessToken();
        res.status(200).json(new ApiResponse(200, data, 'Public token generated successfully'));
    } catch (error) {
        logger.error(error);
        res.status(500).json(new ApiError(500, error.message, error));
    }
}

export async function createNewDataRequestIdController(req: Request, res: Response): Promise<void> {
    const userId = req.query.userId as string;

    try {
        // 1. Get user details
        const userResponse = await getUserById(Number(userId));

        if (!userResponse.success) {
            res.status(500).json(new ApiError(500, `Failed to get user details: ${userResponse.message}`));
            return;
        }

        const user = userResponse.data.userResponse;

        // 2. Create new Individual
        const createNewIndividualPayload = {
            first_name: user.firstname,
            last_name: user.lastname,
            email: user.email,
            external_id: user.email || '',
            phone_number: user.mobilephone || ''
        };

        const newIndividualResponse = await createNewIndividualController(createNewIndividualPayload);

        if (!newIndividualResponse.success) {
            res.status(500).json(new ApiError(500, newIndividualResponse.message));
            return;
        }

        const newIndividualId = newIndividualResponse.data.individual_id;

        // 3. Create new Data Request
        const response = await createNewDataRequest(newIndividualId, userId);
        const dataRequestId = response.data.id;

        if (!dataRequestId) {
            res.status(500).json(new ApiError(500, 'Failed to create new data request'));
            return;
        }

        const publicAccessTokenResponse = await generateMeasureOnePublicAccessToken();

        const dataRequestBody = {
            dataRequestId,
            publicAccessToken: publicAccessTokenResponse.data.access_token
        };

        res.status(200).json(new ApiResponse(200, dataRequestBody, 'Data request created successfully'));
    } catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
}

export async function generateDataRequestLinkController(req: Request, res: Response): Promise<void> {
    const userId = req.query.userId as string;

    try {
        if (!userId) {
            throw new ApiError(400, 'User ID is required');
        }

        // 1. Get user details
        const userResponse = await getUserById(Number(userId));

        if (!userResponse.success) {
            throw new ApiError(400, `Failed to get user details: ${userResponse.message}`);
        }

        let individualId = userResponse.data?.insuranceDetails?.[0]?.individualId || null;

        logger.info(`Retrieved individual ID: ${individualId}`);

        if (!individualId) {
            // If no individualId, create a new Individual
            const user = userResponse.data.userResponse;
            const createNewIndividualPayload = {
                first_name: user.firstname,
                last_name: user.lastname,
                email: user.email,
                external_id: user.email || '',
                phone_number: user.mobilephone || ''
            };

            const newIndividualResponse = await createNewIndividualController(createNewIndividualPayload);

            if (!newIndividualResponse.success) {
                throw new ApiError(400, `Failed to create new individual: ${newIndividualResponse.message}`);
            }

            individualId = newIndividualResponse.data.individual_id;
            logger.info(`Created new individual with ID: ${individualId}`);

            const payload = {
                userId: Number(userId),
                isVerified: false,
                verifiedStatus: insranceVerificationStatus.NOT_VERIFIED,
                requestId: null,
                individualId: individualId,
                itemId: null,
                policyNumber: null,
                startDate: null,
                expiryDate: null,
                policyHolders: null,
                insuranceProvider: null,
                coverages: null
            };
            await updateInsuranceDetails(payload);
        }

        // 2. Create new Data Request using the existing or newly created individualId
        const dataRequestResponse = await createNewDataRequest(individualId, userId);

        if (!dataRequestResponse?.data?.id) {
            throw new ApiError(400, 'Failed to create new data request');
        }

        const dataRequestId = dataRequestResponse.data.id;

        // 3. Generate invitation link
        const invitationLinkResponse = await generateMeasureOneInvitationLink(dataRequestId);

        if (!invitationLinkResponse?.data?.uri) {
            throw new ApiError(400, 'Failed to generate invitation link');
        }

        const uri = invitationLinkResponse.data.uri;

        // 4. Update Bundee user insurance details
        const payload = {
            userId: Number(userId),
            isVerified: false,
            verifiedStatus: insranceVerificationStatus.NOT_VERIFIED,
            requestId: dataRequestId,
            individualId: individualId,
            itemId: null,
            policyNumber: null,
            startDate: null,
            expiryDate: null,
            policyHolders: null,
            insuranceProvider: null,
            coverages: null
        };

        const updateUserResponse = await updateInsuranceDetails(payload);

        if (!updateUserResponse.success) {
            throw new ApiError(400, `Failed to update datarequest details: ${updateUserResponse.message}`);
        }

        // Respond with the generated invitation link
        res.status(200).json(new ApiResponse(200, { uri }, 'Invitation link generated successfully'));
    } catch (error) {
        logger.error(`Error in generating data request link: ${error.message}`);

        // Send proper error message when the error occurs
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                statusCode: error.statusCode,
                success: false,
                message: error.message, // Ensure message is returned
                errors: error.errors || []
            });
        } else {
            // For unexpected errors, respond with 500 status
            res.status(500).json(new ApiError(500, 'An unexpected error occurred', [], error.stack));
        }
    }
}

export async function createNewIndividualController({ first_name, last_name, email, external_id, phone_number, address }: CreateNewIndividualPayload) {
    try {
        const resp = await generateMeasureOneAccessToken();
        const accessToken = await resp.data.access_token;

        console.log('Access token ', accessToken);

        const url = `${env.MEASUREONE_BASE_URL}/v3/individuals/new`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                version: env.MEASUREONE_API_VERSION
            }
        };

        const payload = {
            first_name,
            last_name,
            email: email,
            external_id,
            phone_number
        };

        const response = await axios.post(url, payload, config);

        console.log('Create New Individual Response', response.data);
        if (response.status !== 200) {
            throw new Error(response.data.message);
        }

        return {
            success: true,
            data: {
                individual_id: response.data.id
            },
            message: 'Individual created successfully'
        };
    } catch (error) {
        logger.error(error.message);
        return {
            success: false,
            data: null,
            message: `Failed to create individual : ${error.message}`
        };
    }
}

export async function getItemsOfIndividualOnDataRequestController(req: Request, res: Response) {
    const datarequestId = req.query.datarequestId as string;

    try {
        const response = await getItemsOfIndividualOnDataRequest(datarequestId);

        if (response.status !== 200) {
            throw new ApiError(400, 'Failed to get items of individual on data request');
        }

        if (!response.data?.items) {
            throw new ApiError(400, 'Failed to get items of individual on data request');
        }

        const items = response.data.items;

        // Filter the items based on source_data_type
        const filteredItems = items.filter((item) => item.source_data_type === SOURCE_DATA_TYPE);

        // If there are no matching items, return null
        if (filteredItems.length === 0) {
            throw new ApiError(400, 'No items found for the given data request');
        }

        const item_id = filteredItems.sort((a, b) => b.updated_at - a.updated_at)[0].id;

        const itemDetailsResponse = await getItemDetails(item_id);

        if (itemDetailsResponse.status !== 200) {
            throw new ApiError(400, 'Failed to get item details');
        }

        const itemDetails = itemDetailsResponse.data;

        res.status(200).json(new ApiResponse(200, itemDetails, 'Item details fetched successfully'));
    } catch (error) {
        logger.error(` ${error.message}`);

        // Send proper error message when the error occurs
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                statusCode: error.statusCode,
                success: false,
                message: error.message, // Ensure message is returned
                errors: error.errors || []
            });
        } else {
            // For unexpected errors, respond with 500 status
            res.status(500).json(new ApiError(500, 'An unexpected error occurred', [], error.stack));
        }
    }
}
