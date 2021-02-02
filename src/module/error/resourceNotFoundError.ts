import { IApiError } from '../../core/apiError';

export class ResourceNotFoundError extends Error implements IApiError {
    name: string = 'NO_RESOURCE';
    message: string = 'Required resource has not been found';
    code: number = 502;
}
