"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
// Load environment variables based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV}`;
(0, dotenv_1.config)({ path: envFile });
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number(),
    NODE_ENV: zod_1.z.union([zod_1.z.literal('development'), zod_1.z.literal('qa'), zod_1.z.literal('production')]),
    PASSWORD: zod_1.z.string(),
    // Firebase configuration
    FIREBASE_PROJECT_ID: zod_1.z.string(),
    FIREBASE_CLIENT_EMAIL: zod_1.z.string(),
    FIREBASE_PRIVATE_KEY: zod_1.z.string(),
    FIREBASE_CLIENT_ID: zod_1.z.string(),
    FIREBASE_CLIENT_X509_CERT_URL: zod_1.z.string(),
    FIREBASE_PRIVATE_KEY_ID: zod_1.z.string(),
    // Twilio configuration
    TWILIO_ACCOUNT_SID: zod_1.z.string(),
    TWILIO_AUTH_TOKEN: zod_1.z.string(),
    TWILIO_API_SECRET: zod_1.z.string(),
    TWILIO_API_KEY: zod_1.z.string(),
    // Bunbee configuration
    ENV_PREFIX: zod_1.z.string(),
    BUNDEE_AUTH_TOKEN: zod_1.z.string(),
    BUNDEE_BOOKING_SERVICE_BASE_URL: zod_1.z.string(),
    BUNDEE_HOST_VEHICLE_BASE_URL: zod_1.z.string(),
    BUNDEE_AVAILABILITY_SERVICE_BASE_URL: zod_1.z.string(),
    // MeasureOne congfiguration
    MEASUREONE_BASE_URL: zod_1.z.string(),
    MEASUREONE_BRARER_TOKEN: zod_1.z.string(),
    MEASUREONE_API_VERSION: zod_1.z.string(),
    // Stripe configuration
    STRIPE_BASE_URL: zod_1.z.string(),
    STRIPE_SECRET_KEY: zod_1.z.string(),
    STRIPE_PUBLISHABLE_KEY: zod_1.z.string()
});
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map