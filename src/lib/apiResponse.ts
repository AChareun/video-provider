import { ApiErrors } from '../core/apiError';

export interface IApiResponse {
    status: string;
    code: number;
    message: string;
    data: any[] | null;
}

export class ApiResponseHelper {
    apiErrors: Error[];

    constructor(apiErrors: Error[]) {
        this.apiErrors = apiErrors;
    }

    buildOkResponse(data?: any[]): IApiResponse {
        return {
            status: 'OK',
            code: 200,
            message: 'Success on request',
            data: data || null,
        };
    }

    buildErrorResponse(errorName: string): IApiResponse {
        const apiError = ApiErrors[errorName];

        return {
            status: 'ERROR',
            code: apiError.code,
            message: apiError.message,
            data: null,
        };
    }
}
