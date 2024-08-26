"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserTokenInFirebase = exports.getUserByEmailInFirebase = exports.updateUserInFirebase = exports.createUserInFirebase = void 0;
const firebase_1 = __importDefault(require("../../configs/firebase.js"));
const logger_1 = __importDefault(require("../../utils/logger.js"));
const createUserInFirebase = async (req, res) => {
    const { email, emailVerified, phoneNumber, password, displayName, photoURL, disabled } = req.validatedData;
    try {
        const auth = firebase_1.default.auth();
        const user = await auth.createUser({
            email,
            emailVerified,
            phoneNumber,
            password,
            displayName,
            photoURL,
            disabled
        });
        res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({
            message: 'Error creating user',
            error
        });
    }
};
exports.createUserInFirebase = createUserInFirebase;
const updateUserInFirebase = async (req, res) => {
    const { uid, email, emailVerified, phoneNumber, password, displayName, photoURL, disabled } = req.validatedData;
    try {
        const auth = firebase_1.default.auth();
        const user = await auth.updateUser(uid, {
            email,
            emailVerified,
            phoneNumber,
            password,
            displayName,
            photoURL,
            disabled
        });
        res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({
            message: 'Error updating user',
            error
        });
    }
};
exports.updateUserInFirebase = updateUserInFirebase;
const getUserByEmailInFirebase = async (req, res) => {
    const { email } = req.validatedData;
    try {
        const auth = firebase_1.default.auth();
        const user = await auth.getUserByEmail(email);
        res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({
            message: 'Error getting user',
            error
        });
    }
};
exports.getUserByEmailInFirebase = getUserByEmailInFirebase;
const verifyUserTokenInFirebase = async (req, res) => {
    const { token } = req.validatedData;
    try {
        const auth = firebase_1.default.auth();
        const response = await auth.verifyIdToken(token);
        res.status(200).json(response);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({
            message: 'Error verifying user token',
            error
        });
    }
};
exports.verifyUserTokenInFirebase = verifyUserTokenInFirebase;
//# sourceMappingURL=firebaseUser.controller.js.map