interface IApiReponse {
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

    buildOkResponse(data?: any[]): IApiReponse {
        return {
            status: 'OK',
            code: 200,
            message: 'Success on request',
            data: data || null,
        };
    }

    buildErrorResponse(code: number, message: string): IApiReponse {
        return {
            status: 'ERROR',
            code,
            message,
            data: null,
        };
    }
}
