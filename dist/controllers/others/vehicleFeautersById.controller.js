import { env } from '@/configs/env';
import logger from '@/utils/logger';
import axios from 'axios';
export default async function vehicleFeautersById(vehicleId) {
    const url = `${env.BUNDEE_AVAILABILITY_SERVICE_BASE_URL}/v1/availability/getVehiclesnFeaturesById`;
    const payload = {
        vehicleid: vehicleId
    };
    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env.BUNDEE_AUTH_TOKEN
    };
    try {
        const response = await axios.post(url, payload, { headers: headers });
        logger.info(response.data);
        if (response.data.errorCode === '0') {
            const vehicleFeatures = response.data.vehicleAllDetails[0];
            return vehicleFeatures;
        }
        return null;
    }
    catch (error) {
        logger.error(error);
    }
}
//# sourceMappingURL=vehicleFeautersById.controller.js.map