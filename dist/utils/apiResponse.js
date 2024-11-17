export class ApiResponse {
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}
export const handleResponse = (response) => {
    const codes = response.codes || [];
    const successCode = codes.find((code) => code.key === 'SUCCESS');
    if (successCode.key === 'SUCCESS' && response.errorCode === '0') {
        return { success: true, data: response, message: response.errorMessage };
    }
    if (response.errorCode === '1') {
        return { success: false, data: null, message: response.errorMessage };
    }
    const errorCodes = codes.map((code) => code.key).join(', ');
    return { success: false, data: null, message: `Error: ${errorCodes}` };
};
//# sourceMappingURL=apiResponse.js.map