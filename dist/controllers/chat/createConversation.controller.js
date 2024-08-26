"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversation = void 0;
const env_1 = require("../../configs/env.js");
const firebase_1 = __importDefault(require("../../configs/firebase.js"));
const twilio_1 = require("../../configs/twilio.js");
const apiError_1 = require("../../utils/apiError.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const envPrefix = env_1.env.ENV_PREFIX || 'dev';
// Main function to create a conversation
const createConversation = async (req, res) => {
    const { tripId } = req.validatedData;
    try {
        const service = await createService(tripId);
        const conversation = await createConversationService(service.sid, tripId);
        const host = await createParticipant(service.sid, conversation.sid, 'HOST');
        const clientParticipant = await createParticipant(service.sid, conversation.sid, 'CLIENT');
        await saveIdsToFB(tripId, service.sid, conversation.sid, host.sid, clientParticipant.sid);
        res.status(200).json({ service, conversation, host, clientParticipant });
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(500).json(new apiError_1.ApiError(500, error.message, error));
    }
};
exports.createConversation = createConversation;
// Function to create a service
const createService = async (tripId) => {
    return await twilio_1.twilioClient.conversations.v1.services.create({
        friendlyName: `${envPrefix}_service_${tripId}`,
        //@ts-ignore
        uniqueName: `${envPrefix}_service_${tripId}`
    });
};
// Function to create a conversation in a service
const createConversationService = async (serviceSid, tripId) => {
    return await twilio_1.twilioClient.conversations.v1.services(serviceSid).conversations.create({
        friendlyName: `${envPrefix}_conversation_${tripId}`,
        uniqueName: `${envPrefix}_conversation_${tripId}`
    });
};
// Function to create a participant in a conversation
const createParticipant = async (serviceSid, conversationSid, role) => {
    return await twilio_1.twilioClient.conversations.v1
        .services(serviceSid)
        .conversations(conversationSid)
        .participants.create({
        attributes: JSON.stringify({ role }),
        identity: role
    });
};
// Function to save IDs to Firebase
const saveIdsToFB = async (tripId, serviceId, conversationId, hostId, clientId) => {
    const db = firebase_1.default.firestore();
    const docRef = db.collection(`${envPrefix}_id_${tripId}`).doc(`${envPrefix}_id_${tripId}`);
    await docRef.set({
        serviceId,
        channelId: conversationId,
        hostId,
        clientId
    });
};
//# sourceMappingURL=createConversation.controller.js.map