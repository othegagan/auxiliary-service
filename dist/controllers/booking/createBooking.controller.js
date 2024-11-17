import { env } from '@/configs/env';
import logger from '@/utils/logger';
import axios from 'axios';
import logUpdate from '../others/logUpdate.controller';
import approveBooking from './approveBooking.controller';
export default async function createBooking(startDate, endDate, vehicleId) {
    let days = (new Date(startDate).valueOf() - new Date(endDate).valueOf()) / (1000 * 60 * 60 * 24);
    days = days % 1 > 0 ? days - (days % 1) + 1 : days;
    const url = `${env.BUNDEE_BOOKING_SERVICE_BASE_URL}/v1/booking/createReservation`;
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
        Bundee_auth_token: env.BUNDEE_AUTH_TOKEN
    };
    try {
        const response = await axios.post(url, payload, { headers: headers });
        logger.info(response.data);
        if (response.data.errorCode === '0') {
            const bookingId = response.data.activeTrips[0].tripid;
            await approveBooking(bookingId);
            await logUpdate(response.data.errorMessage);
        }
        else {
            await logUpdate(response.data.errorMessage);
        }
    }
    catch (error) {
        logger.error(error);
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