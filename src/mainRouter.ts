import { getAllChatHistoryFluxRouter, getAllChatHistoryRouter } from '@/routes/chat/chatHistory.route';
import createConversationRouter from '@/routes/chat/createConversation.route';
import getAllChatAssetsRouter from '@/routes/chat/getAllChatAssets.route';
import getClientAccessTokenRouter from '@/routes/chat/getClientAccessToken.route';
import getHostAccessTokenRouter from '@/routes/chat/getHostAccessToken.route';
import { clientSendMessageFluxRouter, clientSendMessageRouter, hostSendMessageRouter, systemSendMessageRouter } from '@/routes/chat/message.route';
import { copyTuroVehicleDataRouter, copyTuroVehicleDataServerlessRouter } from '@/routes/turo/copyTuroVehicleData.route';
import webhookRouter from '@/routes/webhook/webhook.route';
// This file is used to export all routes
import { Router } from 'express';
import priceCalculationRouter from './routes/booking/priceCalculation.route';
import insuranceRouter from './routes/insurance/insurance.route';
import firebaseRouter from './routes/others/firebaseUser.route';
import getVehicleSpecificDatesRouter from './routes/others/getVehicleSpecificDates.route';
import { getByZipCodeRouter, getZipCodeRouter } from './routes/others/latLongToZipCodes';
import timeConversionRouter from './routes/others/timeConversion.route';

const mainRouter = Router();

// Chat
mainRouter.use('/createConversation', createConversationRouter);
mainRouter.use('/getAllChatAssets', getAllChatAssetsRouter);
mainRouter.use('/getHostAccessToken', getHostAccessTokenRouter);
mainRouter.use('/getClientAccessToken', getClientAccessTokenRouter);

mainRouter.use('/clientSendMessage', clientSendMessageRouter);
mainRouter.use('/hostSendMessage', hostSendMessageRouter);
mainRouter.use('/systemSendMessage', systemSendMessageRouter);
mainRouter.use('/clientSendMessageFlux', clientSendMessageFluxRouter);

mainRouter.use('/getAllChatHistory', getAllChatHistoryRouter);
mainRouter.use('/getAllChatHistoryFlux', getAllChatHistoryFluxRouter);

// Turo
mainRouter.use('/copyTuroVehicleData', copyTuroVehicleDataRouter);
mainRouter.use('/copyTuroVehicleDataServerless', copyTuroVehicleDataServerlessRouter);

// Firebase user management
mainRouter.use('/', firebaseRouter);

// Booking
mainRouter.use('/api/v1/priceCalculation', priceCalculationRouter);

// Time Conversion
mainRouter.use('/api/v1/timeConversions', timeConversionRouter);
mainRouter.use('/getVehicleSpecificDates', getVehicleSpecificDatesRouter);
mainRouter.use('/api/v1/availability/getZipCode', getZipCodeRouter);
mainRouter.use('/api/v1/availability/getByZipCode', getByZipCodeRouter);

// Insurance
mainRouter.use('/api/v1/insurance/webhook', webhookRouter);
mainRouter.use('/api/v1/insurance', insuranceRouter);

export default mainRouter;
