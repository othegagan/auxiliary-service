"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createBooking;
const env_1 = require("../../configs/env.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const axios_1 = __importDefault(require("axios"));
const logUpdate_controller_1 = __importDefault(require("../others/logUpdate.controller.js"));
const approveBooking_controller_1 = __importDefault(require("./approveBooking.controller.js"));
async function createBooking(startDate, endDate, vehicleId) {
    let days = (new Date(startDate).valueOf() - new Date(endDate).valueOf()) / (1000 * 60 * 60 * 24);
    days = days % 1 > 0 ? days - (days % 1) + 1 : days;
    const url = `${env_1.env.BUNDEE_BOOKING_SERVICE_BASE_URL}/v1/booking/createReservation`;
    const payload = {
        vehicleid: vehicleId,
        userId: '1378',
        startTime: startDate,
        endTime: endDate,
        channelName: 'turo',
        deductionfrequencyconfigid: 1,
        paymentauthorizationconfigid: 1,
        authorizationamount: 1,
        authorizationpercentage: 1,
        perDayAmount: 1,
        totalDays: `${days}`,
        stripePaymentToken: 'pi_3O2SWMAHBUVqiOLM2UEfeLIF',
        stripePaymentID: 'NA',
        stripePaymentTransactionDetail: '{ "key1" : "val1" }',
        paymentMethodIDToken: 'NA',
        customerToken: 'cus_OpmOXorq5jctzC',
        setupIntentToken: 'NA',
        isCustomerTokenNew: 'NA',
        comments: 'Request to book',
        taxAmount: 1,
        tripTaxAmount: 1,
        totalamount: 1,
        tripamount: '1',
        pickupTime: startDate,
        dropTime: endDate
    };
    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env_1.env.BUNDEE_AUTH_TOKEN
    };
    try {
        const response = await axios_1.default.post(url, payload, { headers: headers });
        logger_1.default.info(response.data);
        if (response.data.errorCode === '0') {
            const bookingId = response.data.activeTrips[0].tripid;
            await (0, approveBooking_controller_1.default)(bookingId);
            await (0, logUpdate_controller_1.default)(response.data.errorMessage);
        }
        else {
            await (0, logUpdate_controller_1.default)(response.data.errorMessage);
        }
    }
    catch (error) {
        logger_1.default.error(error);
    }
}
// import schedule from 'node-schedule';
// import { handleTripCreation } from './path/to/your/tripHandler';
// // Assuming tripsToBeCreated is defined somewhere in your app
// const tripsToBeCreated = {};
// // Schedule the job to run every minute
// const job = schedule.scheduleJob('* * * * *', async () => {
//     console.log('Running scheduled trip processing job');
//     const keys = Object.keys(tripsToBeCreated);
//     for (const key of keys) {
//         try {
//             await handleTripCreation(tripsToBeCreated[key]);
//             delete tripsToBeCreated[key];
//             console.log(`Processed and removed trip: ${key}`);
//         } catch (error) {
//             console.error(`Error processing trip ${key}:`, error);
//             // Optionally, you might want to implement some retry logic here
//         }
//     }
// });
// // You can also add this to gracefully stop the job when the server is shutting down
// process.on('SIGTERM', () => {
//     job.cancel();
// });
// '*/30 * * * * *' would run every 30 seconds
// '0 */5 * * * *' would run every 5 minutes
//# sourceMappingURL=createBooking.controller.js.map