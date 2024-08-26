"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = exports.clientSendMessage = exports.hostSendMessage = exports.systemSendMessage = void 0;
const env_1 = require("../../configs/env.js");
const firebase_1 = __importDefault(require("../../configs/firebase.js"));
const twilio_1 = require("../../configs/twilio.js");
const apiError_1 = require("../../utils/apiError.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const axios_1 = __importDefault(require("axios"));
const envPrefix = process.env.ENV_PREFIX || 'dev';
const systemSendMessage = (req, res) => sendMessage(req, res);
exports.systemSendMessage = systemSendMessage;
const hostSendMessage = (req, res) => sendMessage(req, res, 'HOST');
exports.hostSendMessage = hostSendMessage;
const clientSendMessage = (req, res) => sendMessage(req, res, 'CLIENT');
exports.clientSendMessage = clientSendMessage;
const sendMessage = async (req, res, identity) => {
    const { tripId, message } = req.validatedData;
    try {
        const db = firebase_1.default.firestore();
        const assetDoc = await db.collection(`${envPrefix}_id_${tripId}`).doc(`${envPrefix}_id_${tripId}`).get();
        const serviceSid = assetDoc.get('serviceId');
        const channelSid = assetDoc.get('channelId');
        const messageOptions = { body: message };
        if (identity)
            messageOptions.author = identity;
        const twilloMessage = await twilio_1.twilioClient.conversations.v1.services(serviceSid).conversations(channelSid).messages.create(messageOptions);
        await (0, exports.sendPushNotification)(message, tripId, identity === 'HOST' ? 'client' : identity === 'CLIENT' ? 'host' : 'both');
        res.status(200).json({ messageId: twilloMessage.sid });
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(500).json(new apiError_1.ApiError(500, error.message, error));
    }
};
const sendPushNotification = async (message, tripId, receiverType) => {
    const url = `${env_1.env.BUNDEE_BOOKING_SERVICE_BASE_URL}/v1/booking/pushNotification`;
    const payload = { tripId, receiverType, message };
    const config = { headers: { Bundee_auth_token: env_1.env.BUNDEE_AUTH_TOKEN } };
    return axios_1.default.post(url, payload, config);
};
exports.sendPushNotification = sendPushNotification;
//# sourceMappingURL=message.controller.js.map