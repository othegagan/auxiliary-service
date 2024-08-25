import { env } from '@/configs/env';
import approveBooking from '@/controllers/booking/approveBooking.controller';
import logUpdate from '@/controllers/logUpdate.controller';
import logger from '@/utils/logger';
import axios from 'axios';
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
