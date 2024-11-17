import { insranceVerificationStatus } from '@/types';
import { ApiError } from '@/utils/apiError';
import { ApiResponse } from '@/utils/apiResponse';
import { decryptData } from '@/utils/lib';
import logger from '@/utils/logger';
import { Request, Response } from 'express';
import { updateInsuranceDetails } from '../others/user.controller';
import { SOURCE_DATA_TYPE, extractPolicyDetails, getItemDetails, getItemsOfIndividualOnDataRequest } from './insuranceHelpers';

export const webhook = async (req: Request, res: Response) => {
    const body = req.body;
    const userToken = req.headers.usertoken as string;
    const userId = Number(decryptData(userToken));

    try {
        const responseFromMeasureOne = { ...body };
        const dataRequestId = responseFromMeasureOne.datarequest_id;
        const individualId = responseFromMeasureOne.individual_id;

        if (responseFromMeasureOne.event === 'datasource.connected') {
            const payload = {
                userId: userId,
                isVerified: false,
                verifiedStatus: insranceVerificationStatus.IN_PROGRESS,
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
                throw new ApiError(400, 'Failed to update insurance inprogress status');
            }

            res.status(200).json(new ApiResponse(200, null, 'Insurance inprogress status updated successfully'));
        }

        if (responseFromMeasureOne.event === 'datarequest.report_available') {
            const getItemDetailsResponse = await getItemsOfIndividualOnDataRequest(dataRequestId);

            if (getItemDetailsResponse.status !== 200) {
                throw new ApiError(400, 'Failed to get items');
            }

            if (!getItemDetailsResponse.data?.items) {
                throw new ApiError(400, 'Failed to get items of individual on data request');
            }

            const items = getItemDetailsResponse.data.items;

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

            const extractedData = extractPolicyDetails(itemDetails);

            const payload = {
                userId: userId,
                isVerified: true,
                verifiedStatus: insranceVerificationStatus.VERIFIED,
                requestId: dataRequestId,
                individualId: individualId,
                itemId: itemDetails.id,
                policyNumber: extractedData.policyNumber,
                startDate: extractedData.startDate,
                expiryDate: extractedData.expiryDate,
                policyHolders: extractedData.policyHolders,
                insuranceProvider: extractedData.insuranceProvider,
                coverages: extractedData.coverages
            };

            const updateUserResponse = await updateInsuranceDetails(payload);

            if (!updateUserResponse.success) {
                throw new ApiError(400, 'Failed to update insurance details');
            }

            res.status(200).json(new ApiResponse(200, null, 'Report available event received successfully'));
        }

        if (responseFromMeasureOne.event === 'datarequest.report_error') {
            const payload = {
                userId: Number(userId),
                isVerified: false,
                verifiedStatus: insranceVerificationStatus.FAILED,
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

            res.status(200).json(new ApiResponse(200, null, 'Report error event received successfully'));
        }

        if (responseFromMeasureOne.event === 'session.rejected') {
            const payload = {
                userId: Number(userId),
                isVerified: false,
                verifiedStatus: insranceVerificationStatus.FAILED,
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

            res.status(200).json(new ApiResponse(200, null, 'Session rejected event received successfully'));
        }
    } catch (error) {
        logger.error(`${error.message}`);

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
};
