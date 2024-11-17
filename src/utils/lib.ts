import { parseZonedDateTime } from '@internationalized/date';
import CryptoJS from 'crypto-js';
import gps from 'gps2zip';
import moment from 'moment-timezone';
import { readPackage } from 'read-pkg';
import tzlookup from 'tz-lookup';
import zipToTimeZone from 'zipcode-to-timezone';
import zipCodesNearby from 'zipcodes-nearby';

const key = CryptoJS.enc.Utf8.parse('4f1aaae66406e358');
const iv = CryptoJS.enc.Utf8.parse('df1e180949793972');

/**
 * Converts a given date and time to ISO format in the timezone of the specified zip code.
 *
 * @param dateTime - The date and time in 'YYYY-MM-DDTHH:MM:SS' format.
 * @param zipCode - The zip code to determine the timezone.
 * @returns The converted date and time in ISO format with the zipcode's timezone.
 * @throws Error if the timezone cannot be determined from the zip code or if the date is invalid.
 */
export function convertToTimeZoneISO(dateTime: string, zipCode: string | number): string {
    if (!dateTime || !zipCode) {
        throw new Error('Both dateTime and zipCode are required');
    }

    const timeZone = findTimeZoneByZipcode(zipCode);
    if (!timeZone) {
        throw new Error(`Unable to determine timezone for zip code: ${zipCode}`);
    }

    try {
        const zonedDateTime = parseZonedDateTime(`${dateTime}[${timeZone}]`);
        return zonedDateTime.toAbsoluteString();
    } catch (error) {
        throw new Error(`Invalid date format or conversion error: ${error.message}`);
    }
}

/**
 * Converts a given date from UTC to the specified time zone format.
 *
 * @param datetime - The date in YYYY-MM-DDTHH:MM:SS  format or UTC format.
 * @param zipCode - The zip code to determine the timezone.
 * @param format - Desired format of the converted date. ex: 'yyyy-MM-DD'. or 'YYYY-MM-DDTHH:mm:ss'
 * @returns The converted date and time in local zipcode time zone format.
 */
export function formatDateAndTime(date: string, zipCode: string, format = 'ddd, MMM DD YYYY | h:mm A z') {
    if (!date || !zipCode) return '';
    const endTimeUTC = moment.utc(date);
    const timeZone = findTimeZoneByZipcode(zipCode);
    const timeInTimeZone = endTimeUTC.tz(timeZone);

    return timeInTimeZone.format(format || 'ddd, MMM DD YYYY | h:mm A z');
}

/**
 * Gives the timezone of a zip code.

 * @param zipCode - The zip code to determine the timezone.
 * @returns timezone of the zip code.
 * @returns null if the timezone cannot be determined from the zip code.
 */
export function findTimeZoneByZipcode(zipCode: string | number) {
    const timeZone = zipToTimeZone.lookup(zipCode); // 73301, (Los angeles zip code : 90274) (MST : 85323)
    return timeZone || null;
}

/**
 * Gives the timezone of a lat long.
 *
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @returns timezone of the location.
 * @returns null if the timezone cannot be determined from the location.
 */
export function findTimezoneOfLatLong(latitude: number, longitude: number) {
    if (!latitude || !longitude) return '';
    const timeZone = tzlookup(latitude, longitude);
    return timeZone || null;
}

/**
 * Gives near by zip codes by latitude and longitude.
 *
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @returns near by zip codes.
 * @returns empty array if the zip codes cannot be determined from the location.
 */
export function findNearByZipcodesByLatLong(latitude: number, longitude: number) {
    if (!latitude || !longitude) return [];
    const options = {
        longitude,
        latitude
    };
    const radius = 24000;
    const nearbyZipcodes = zipCodesNearby.near(options, radius);
    return nearbyZipcodes || [];
}

/**
 * Gives the zip code of a lat long.
 *
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @returns zip code of a lat long.the location.
 * @returns null if the zip code cannot be determined from the location.
 */
export function findZipcodeOfLatLong(latitude: number, longitude: number) {
    if (!latitude || !longitude) return '';
    const zipCode = gps.gps2zip(latitude, longitude);
    return zipCode || null;
}

/**
 * Encrypts the str using AES algorithm
 *
 * @param str - The string to be encrypted
 * @returns The encrypted string
 */
export const encryptData = (str: string | CryptoJS.lib.WordArray): any => {
    try {
        const encrypted = CryptoJS.AES.encrypt(str, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const encryptedText = encrypted.toString();

        return encryptedText;
    } catch (error) {
        console.error('Encryption Error:', error);
        return null;
    }
};

/**
 * Decrypts the cipherText using AES algorithm
 *
 * @param cipherText - The cipherText to be decrypted
 * @returns The decrypted string
 */
export const decryptData = (cipherText: string | CryptoJS.lib.CipherParams) => {
    try {
        if (!cipherText) return null;
        const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedString = CryptoJS.enc.Utf8.stringify(decrypted);

        return decryptedString;
    } catch (error) {
        console.error('Decryption Error:', error);
        return null;
    }
};

/**
 * Gets the version of the application.
 *
 * @returns The version of the application.
 */
export async function getAppVersion() {
    try {
        const packageJson = await readPackage();
        return packageJson.version;
    } catch (error) {
        console.error('Error reading package.json:', error);
        return null;
    }
}
