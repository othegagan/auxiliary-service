"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger.js"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const env_1 = require("./env.js");
const serviceAccount = {
    clientEmail: env_1.env.FIREBASE_CLIENT_EMAIL,
    privateKey: env_1.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    projectId: env_1.env.FIREBASE_PROJECT_ID
};
// logger.info("Initializing Firebase");
// logger.info(JSON.stringify(serviceAccount, null, 2));
try {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
        databaseURL: `https://${env_1.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    // logger.info("Firebase initialized successfully");
}
catch (error) {
    logger_1.default.error('Error initializing Firebase:', error);
}
exports.default = firebase_admin_1.default;
//# sourceMappingURL=firebase.js.map