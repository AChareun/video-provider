import { IApiError } from '../../core/apiError';

export class GenericDatabaseError extends Error implements IApiError {
    name: string = 'DATABASE_ERROR';
    message: string = 'There has been an error with the DataBase';
    code: number = 501;
}
