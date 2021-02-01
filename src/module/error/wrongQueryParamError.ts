export class WrongQueryParamError extends Error {
    name: string = "WRONG_QUERY_PARAM";
    message: string = 'Wrong query parameter';
    code: number = 430;
}
