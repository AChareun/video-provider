import { WrongQueryParamError } from '../module/error/wrongQueryParamError';
import { ResourceNotFoundError } from '../module/error/resourceNotFoundError';
import { GenericDatabaseError } from '../module/title/repository/error/genericDatabaseError';

export interface IApiError {
    name: string;
    message: string;
    code: number;
}

export const ApiErrors: { [name: string]: IApiError } = Object.freeze({
    WRONG_QUERY_PARAM: new WrongQueryParamError(),
    NO_RESOURCE: new ResourceNotFoundError(),
    DATABASE_ERROR: new GenericDatabaseError(),
});
