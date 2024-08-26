import admin from '../../configs/firebase.js';
import logger from '../../utils/logger.js';
export const createUserInFirebase = async (req, res) => {
    const { email, emailVerified, phoneNumber, password, displayName, photoURL, disabled } = req.validatedData;
    try {
        const auth = admin.auth();
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
        logger.error(error);
        res.status(500).json({
            message: 'Error creating user',
            error
        });
    }
};
export const updateUserInFirebase = async (req, res) => {
    const { uid, email, emailVerified, phoneNumber, password, displayName, photoURL, disabled } = req.validatedData;
    try {
        const auth = admin.auth();
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
        logger.error(error);
        res.status(500).json({
            message: 'Error updating user',
            error
        });
    }
};
export const getUserByEmailInFirebase = async (req, res) => {
    const { email } = req.validatedData;
    try {
        const auth = admin.auth();
        const user = await auth.getUserByEmail(email);
        res.status(200).json(user);
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            message: 'Error getting user',
            error
        });
    }
};
export const verifyUserTokenInFirebase = async (req, res) => {
    const { token } = req.validatedData;
    try {
        const auth = admin.auth();
        const response = await auth.verifyIdToken(token);
        res.status(200).json(response);
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            message: 'Error verifying user token',
            error
        });
    }
};