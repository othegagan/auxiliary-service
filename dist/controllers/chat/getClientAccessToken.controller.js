"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientAccessToken = void 0;
const env_1 = require("../../configs/env.js");
const twilio_1 = require("../../configs/twilio.js");
const apiError_1 = require("../../utils/apiError.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const AccessToken_js_1 = __importDefault(require("twilio/lib/jwt/AccessToken.js"));
const getClientAccessToken = async (req, res) => {
    const accountSid = env_1.env.TWILIO_ACCOUNT_SID;
    const twilioApiKey = env_1.env.TWILIO_API_KEY;
    const twilioApiSecret = env_1.env.TWILIO_API_SECRET;
    const { serviceId } = req.validatedData;
    try {
        const identity = 'CLIENT';
        const chatGrant = new twilio_1.ChatGrant({
            serviceSid: serviceId
        });
        const token = new AccessToken_js_1.default(accountSid, twilioApiKey, twilioApiSecret, { identity: identity });
        token.addGrant(chatGrant);
        res.status(200).json({ hostAccessToken: token.toJwt() });
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(500).json(new apiError_1.ApiError(500, error.message, error));
    }
};
exports.getClientAccessToken = getClientAccessToken;
//# sourceMappingURL=getClientAccessToken.controller.js.map