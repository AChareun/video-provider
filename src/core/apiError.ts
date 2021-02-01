import { WrongQueryParamError } from '../module/error/wrongQueryParamError';

export interface IApiError {
    name: string;
    message: string;
    code: number;
}

export const ApiErrors: { [name: string]: IApiError } = Object.freeze({
    WRONG_QUERY_PARAM: new WrongQueryParamError(),
});
