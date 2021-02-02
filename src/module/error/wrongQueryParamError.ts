import { IApiError } from '../../core/apiError';

export class WrongQueryParamError extends Error implements IApiError{
    name: string = "WRONG_QUERY_PARAM";
    message: string = 'Wrong query parameter';
    code: number = 430;
}
