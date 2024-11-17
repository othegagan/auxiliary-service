import { env } from '@/configs/env';
import { ExtractPolicyDetails } from '@/types';
import { encryptData } from '@/utils/lib';
import axios from 'axios';
import { addDays } from 'date-fns';
import moment from 'moment-timezone';

const authorizationBuffer = Buffer.from(`${env.MEASUREONE_CLIENT_ID}:${env.MEASUREONE_SECRET}`);
const authorization = `Basic ${authorizationBuffer.toString('base64')}`;

export const SOURCE_DATA_TYPE = 'AUTO_INSURANCE_POLICY';

export async function generateMeasureOneAccessToken() {
    const body = JSON.stringify({});
    const response = await axios(`${env.MEASUREONE_BASE_URL}/v3/auth/generate_access_token`, {
        method: 'POST',
        headers: {
            Authorization: authorization,
            'Content-type': 'application/json'
        },
        data: body
    });

    return response;
}

export async function generateMeasureOnePublicAccessToken() {
    const body = JSON.stringify({});
    const response = await axios(`${env.MEASUREONE_BASE_URL}/v3/auth/generate_public_token`, {
        method: 'POST',
        headers: {
            Authorization: authorization,
            'Content-type': 'application/json'
        },
        data: body
    });

    return response;
}

export async function createNewDataRequest(individual_id: string, userId: string | number) {
    const webhookUrl = env.WEBHOOK_URL || '';

    const headers = {
        'content-Type': 'application/json',
        usertoken: encryptData(String(userId))
    };

    const payload = {
        individual_id,
        type: 'AUTO_INSURANCE_DETAILS',
        requester_name: 'MyBundee Inc',
        requester_logo_url: 'https://bundee.ai/hubfs/Logo%20Smallbundee-logo.svg',
        delivery_details: [
            {
                event_type: 'datasource.connected',
                url: webhookUrl,
                headers: headers
            },
            {
                event_type: 'datarequest.report_available',
                url: webhookUrl,
                headers: headers
            },
            {
                event_type: 'datarequest.report_error',
                url: webhookUrl,
                headers: headers
            },
            {
                event_type: 'transaction.processed',
                url: webhookUrl,
                headers: headers
            },
            // {
            //     event_type: 'datarequest.items_available',
            //     url: webhookUrl,
            //     headers: {
            //         'content-type': 'application/json'
            //     }
            // },
            // {
            //     event_type: 'datarequest.no_items',
            //     url: webhookUrl,
            //     headers: {
            //         'content-type': 'application/json'
            //     }
            // },
            {
                event_type: 'session.rejected',
                url: webhookUrl,
                headers: headers
            }
        ]
    };

    const resp = await generateMeasureOneAccessToken();
    const accessToken = await resp.data.access_token;

    const url = `${env.MEASUREONE_BASE_URL}/v3/datarequests/new`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            version: env.MEASUREONE_API_VERSION
        }
    };

    const response = await axios.post(url, payload, config);

    return response;
}

export async function getItemsOfIndividualOnDataRequest(datarequest_id: string) {
    const body = { datarequest_id };
    const resp = await generateMeasureOneAccessToken();
    const accessToken = await resp.data.access_token;

    const response = await axios(`${env.MEASUREONE_BASE_URL}/v3/individuals/get_items`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        },
        data: body
    });

    return response;
}

export async function getItemDetails(item_id: string) {
    const body = { id: item_id };

    const resp = await generateMeasureOneAccessToken();
    const accessToken = await resp.data.access_token;

    const response = await axios(`${env.MEASUREONE_BASE_URL}/v3/items/get_by_id`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        },
        data: body
    });

    return response;
}

export function extractPolicyDetails(inputData: any): ExtractPolicyDetails {
    const data = inputData.data;
    const startDate = moment(data.coverage_period.start_date, 'MM/DD/YYYY').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const expiryDate = moment(data.coverage_period.end_date, 'MM/DD/YYYY').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const policyDetails: ExtractPolicyDetails = {
        policyNumber: data.policy_number,
        startDate: startDate,
        expiryDate: expiryDate,
        policyHolders: data.policy_holders.map((holder) => ({
            name: holder.name,
            address: {
                addr1: holder.address.addr1,
                addr2: holder.address.addr2,
                city: holder.address.city,
                state: holder.address.state,
                zipcode: holder.address.zipcode
            }
        })),
        insuranceProvider: {
            name: data.insurance_provider.name,
            phoneNumber: data.insurance_provider.phone_number,
            address: {
                addr1: data.insurance_provider.address.addr1,
                addr2: data.insurance_provider.address.addr2,
                city: data.insurance_provider.address.city,
                state: data.insurance_provider.address.state,
                zipcode: data.insurance_provider.address.zipcode
            }
        },
        coverages: {}
    };

    const autoCoverage = data.coverages.find((coverage) => coverage.type === 'AUTO');
    const coverageItems = autoCoverage.details.coverage_items;

    coverageItems.forEach((item) => {
        switch (item.name) {
            case 'Bodily Injury':
                policyDetails.coverages.bodilyInjury = {
                    x12InfoCode: item.x12_info.code,
                    x12InfoDescription: item.x12_info.desc,
                    perPerson: item.limits.find((limit) => limit.type === 'PER_PERSON').value.amount,
                    perAccident: item.limits.find((limit) => limit.type === 'PER_ACCIDENT').value.amount
                };
                break;
            case 'Property Damage':
                policyDetails.coverages.propertyDamage = {
                    x12InfoCode: item.x12_info.code,
                    x12InfoDescription: item.x12_info.desc,
                    perAccident: item.limits.find((limit) => limit.type === 'PER_ACCIDENT').value.amount
                };
                break;
            case 'Collision':
                policyDetails.coverages.collision = {
                    x12InfoCode: item.x12_info.code,
                    x12InfoDescription: item.x12_info.desc,
                    premium: item.premium_amount.amount,
                    deductible: item.deductibles.find((deductible) => deductible.type === 'AMOUNT').value.amount
                };
                break;
            case 'Comprehensive':
                policyDetails.coverages.comprehensive = {
                    x12InfoCode: item.x12_info.code,
                    x12InfoDescription: item.x12_info.desc,
                    premium: item.premium_amount.amount,
                    deductible: item.deductibles.find((deductible) => deductible.type === 'AMOUNT').value.amount
                };
                break;
        }
    });

    return policyDetails;
}

export async function generateMeasureOneInvitationLink(datarequest_id: string) {
    const expirtInDays = 15;

    const body = {
        id: datarequest_id,
        expires_at: addDays(new Date(), expirtInDays).getTime()
    };

    const resp = await generateMeasureOneAccessToken();
    const accessToken = await resp.data.access_token;

    const response = await axios(`${env.MEASUREONE_BASE_URL}/v3/datarequests/generate_invitation_link`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        },
        data: body
    });

    return response;
}
