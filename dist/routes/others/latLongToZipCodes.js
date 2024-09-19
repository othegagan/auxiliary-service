"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByZipCodeRouter = exports.getZipCodeRouter = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler.js");
const lib_1 = require("../../utils/lib.js");
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
/**
 * @swagger
 * components:
 *   schemas:
 *     LatLngInput:
 *       type: object
 *       required:
 *         - lat
 *         - lng
 *       properties:
 *         lat:
 *           type: string
 *           description: Latitude
 *         lng:
 *           type: string
 *           description: Longitude
 *     ZipCodeResponse:
 *       type: object
 *       properties:
 *         zipcode:
 *           type: string
 *           description: The zipcode for the given latitude and longitude
 *     ZipCodesResponse:
 *       type: object
 *       properties:
 *         zipcodes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of nearby zipcodes
 */
const schema = zod_1.z.object({
    lat: zod_1.z.string({ required_error: 'lat is required' }),
    lng: zod_1.z.string({ required_error: 'lng is required' })
});
const getZipCodeRouter = express_1.default.Router();
exports.getZipCodeRouter = getZipCodeRouter;
const getByZipCodeRouter = express_1.default.Router();
exports.getByZipCodeRouter = getByZipCodeRouter;
/**
 * @swagger
 * /api/v1/availability/getZipCode:
 *   post:
 *     summary: Get zipcode for a given latitude and longitude
 *     tags: [Others]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LatLngInput'
 *           example:
 *               lat: "30.2672"
 *               lng: "-97.7431"
 *     responses:
 *       200:
 *         description: Successfully retrieved zipcode
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZipCodeResponse'
 *             example:
 *               zipcode:
 *                 zip_code: 78701
 *                 latitude: 30.270569
 *                 longitude: -97.742589
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
getZipCodeRouter.post('/', (0, zodValidate_1.zodValidate)(schema), (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { lat, lng } = req.validatedData;
    const result = await (0, lib_1.findZipcodeOfLatLong)(lat, lng);
    res.status(200).json({ zipcode: result });
}));
/**
 * @swagger
 * /api/v1/availability/getByZipCode:
 *   post:
 *     summary: Get nearby zipcodes for a given latitude and longitude
 *     tags: [Others]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LatLngInput'
 *           example:
 *               lat: "30.2672"
 *               lng: "-97.7431"
 *     responses:
 *       200:
 *         description: Successfully retrieved nearby zipcodes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZipCodesResponse'
 *             example:
 *               zipcodes: [
 *                 "73301",
 *                 "73344",
 *                 "78701",
 *                 "78702",
 *                 "78703",
 *                 "78704"
 *               ]
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
getByZipCodeRouter.post('/', (0, zodValidate_1.zodValidate)(schema), (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { lat, lng } = req.validatedData;
    const zipcodes = (await (0, lib_1.findNearByZipcodesByLatLong)(lat, lng)) || [];
    res.status(200).json({ zipcodes });
}));
//# sourceMappingURL=latLongToZipCodes.js.map