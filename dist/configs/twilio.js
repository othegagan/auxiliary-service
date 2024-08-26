"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioClient = exports.ChatGrant = void 0;
const twilio_1 = __importDefault(require("twilio"));
const AccessToken_1 = __importDefault(require("twilio/lib/jwt/AccessToken"));
const env_1 = require("./env.js");
const twilioClient = (0, twilio_1.default)(env_1.env.TWILIO_ACCOUNT_SID, env_1.env.TWILIO_AUTH_TOKEN);
exports.twilioClient = twilioClient;
const ChatGrant = AccessToken_1.default.ChatGrant;
exports.ChatGrant = ChatGrant;
//# sourceMappingURL=twilio.js.map