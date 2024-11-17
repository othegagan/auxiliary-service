import admin from '@/configs/firebase';
import { ApiResponse } from '@/utils/apiResponse';
import logger from '@/utils/logger';
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
export const checkPhoneNumberLinked = async (req, res) => {
    try {
        const { phoneNumber } = req.query;
        if (!phoneNumber) {
            res.status(400).json({ message: 'Phone number is required' });
        }
        // Check if the user exists with the given phone number
        const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
        // Respond with link status if user is found
        res.status(200).json(new ApiResponse(200, { linkedToAnyUser: true }, 'Phone number is linked to a user'));
    }
    catch (error) {
        logger.error(error);
        // Handle specific Firebase errors
        if (error.code === 'auth/user-not-found') {
            res.status(200).json(new ApiResponse(200, { linkedToAnyUser: false }, 'Phone number is not linked to any user'));
        }
        // For other Firebase errors related to the phone number
        if (error.code === 'auth/invalid-phone-number' || error.code === 'auth/user-disabled') {
            res.status(400).json(new ApiResponse(400, { linkedToAnyUser: false }, 'Invalid or disabled phone number'));
        }
        // Handle any unexpected errors
        res.status(500).json(new ApiResponse(500, { linkedToAnyUser: false }, 'Internal server error'));
    }
};
//# sourceMappingURL=firebaseUser.controller.js.map