import { ApiResponseHelper } from '../apiResponse';

const responseHelperTest = new ApiResponseHelper([]);

const dataMock = ['mock', 'data'];

const okResponseMock = {
    status: 'OK',
    code: 200,
    message: 'Success on request',
    data: dataMock,
};

const noDataOkResponseMock = {
    status: 'OK',
    code: 200,
    message: 'Success on request',
    data: null,
};

const errorResponseMock = {
    status: 'ERROR',
    code: 430,
    message: 'Wrong query parameter',
    data: null,
};

test('responseHelper methods should return the right objects for the parameters passed', () => {
    let testResponse = responseHelperTest.buildOkResponse(dataMock);
    expect(testResponse).toEqual(okResponseMock);

    testResponse = responseHelperTest.buildOkResponse();
    expect(testResponse).toEqual(noDataOkResponseMock);

    testResponse = responseHelperTest.buildErrorResponse('WRONG_QUERY_PARAM');
    expect(testResponse).toEqual(errorResponseMock);
});
