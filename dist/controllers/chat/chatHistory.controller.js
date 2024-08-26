"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHistory = void 0;
const firebase_1 = __importDefault(require("../../configs/firebase.js"));
const twilio_1 = require("../../configs/twilio.js");
const apiError_1 = require("../../utils/apiError.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const envPrefix = process.env.ENV_PREFIX || 'dev';
const chatHistory = async (req, res) => {
    const { tripId, count } = req.validatedData;
    try {
        const db = firebase_1.default.firestore();
        const id = `${envPrefix}_id_${tripId}`;
        const assetDoc = await db.collection(id).doc(id).get();
        if (assetDoc.exists) {
            const assets = assetDoc.data();
            const serviceSid = assets.serviceId;
            const channelSid = assets.channelId;
            twilio_1.twilioClient.conversations.v1
                .services(serviceSid)
                .conversations(channelSid)
                .messages.list({ limit: count, order: 'desc' })
                .then((messages) => {
                res.status(200).json({ messages });
            });
        }
        else {
            res.status(404).json(new apiError_1.ApiError(404, 'No such document!'));
        }
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(500).json(new apiError_1.ApiError(500, error.message));
    }
};
exports.chatHistory = chatHistory;
//# sourceMappingURL=chatHistory.controller.js.map