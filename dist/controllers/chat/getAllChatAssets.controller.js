"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChatAssets = void 0;
const env_1 = require("../../configs/env.js");
const firebase_1 = __importDefault(require("../../configs/firebase.js"));
const apiError_1 = require("../../utils/apiError.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const envPrefix = env_1.env.ENV_PREFIX || 'dev';
const getAllChatAssets = async (req, res) => {
    const { tripId } = req.validatedData;
    try {
        const db = firebase_1.default.firestore();
        const id = `${envPrefix}_id_${tripId}`;
        const assets = await db.collection(id).doc(id).get();
        res.status(200).json(assets._fieldsProto);
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(500).json(new apiError_1.ApiError(500, error.message, error));
    }
};
exports.getAllChatAssets = getAllChatAssets;
//# sourceMappingURL=getAllChatAssets.controller.js.map