import {
    createNewDataRequestIdController,
    generateDataRequestLinkController,
    getItemsOfIndividualOnDataRequestController
} from '@/controllers/insurance/insurance.controller';
import express from 'express';

const insuranceRouter = express.Router();

/**
 * @swagger
 * /api/v1/insurance/datarequests/new:
 *   get:
 *     summary: Create a new data request id and public access token
 *     tags: [Insurance]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *           description: Bundee user ID
 *     responses:
 *       200:
 *         description: Successful response with data request link of MeasureOne site
 *       400:
 *         description: Bad request (invalid input)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
insuranceRouter.get('/datarequests/new', createNewDataRequestIdController);

/**
 * @swagger
 * /api/v1/insurance/datarequests/generate_invitation_link:
 *   get:
 *     summary: Create a new data request link
 *     tags: [Insurance]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *           description: Bundee user ID
 *     responses:
 *       200:
 *         description: Successful response with data request link of MeasureOne site
 *       400:
 *         description: Bad request (invalid input)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
insuranceRouter.get('/datarequests/generate_invitation_link', generateDataRequestLinkController);

/**
 * @swagger
 * /api/v1/insurance/datarequests/get_items:
 *   get:
 *     summary: Get items of individual on data request
 *     tags: [Insurance]
 *     parameters:
 *       - in: query
 *         name: datarequestId
 *         required: true
 *         schema:
 *           type: number
 *           description: Get items of individual on data request
 *     responses:
 *       200:
 *         description: Successful response with item details
 *       400:
 *         description: Bad request (invalid input)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
insuranceRouter.get('/datarequests/get_items', getItemsOfIndividualOnDataRequestController);

export default insuranceRouter;
