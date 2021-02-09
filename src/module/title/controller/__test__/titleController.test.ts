import { TitleController } from '../titleController';

import { resMock, responseHelperMock, responseMock, titleMock, titleServiceMock } from '../../../__test__/testMocks';

// @ts-expect-error
const testController = new TitleController(titleServiceMock, responseHelperMock);

beforeEach((): void => {
    jest.clearAllMocks();
});

test('getPaginated method should call corresponding service method', async () => {
    // @ts-expect-error
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, resMock);

    expect(titleServiceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(titleServiceMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('getById method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.getById({ params: { titleId: '1' } }, resMock);

    expect(titleServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(titleServiceMock.getById).toHaveBeenCalledWith(1);
});

test('postTitle method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.postTitle({ body: titleMock }, resMock);

    expect(titleServiceMock.addTitle).toHaveBeenCalledTimes(1);
    expect(titleServiceMock.addTitle).toHaveBeenCalledWith(titleMock);
});

test('getTitles method should call corresponding service method depending on query props', async () => {
    // @ts-expect-error
    await testController.getTitles({ query: { limit: '1', offset: '0' } }, resMock);

    expect(titleServiceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(titleServiceMock.getPaginated).toHaveBeenCalledWith(1, 0);

    // @ts-expect-error
    await testController.getTitles({ query: { titleIds: '1, 2, 3, 4' } }, resMock);

    expect(titleServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(titleServiceMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
});

test('getTitleSeasons method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.getTitleSeasons({ params: { titleId: '1' } }, resMock);

    expect(titleServiceMock.getTitleSeasons).toHaveBeenCalledTimes(1);
    expect(titleServiceMock.getTitleSeasons).toHaveBeenCalledWith(1);
});

test('controller methods successfully call res.json method with response from responseHelper', async () => {
    // @ts-expect-error
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getById({ params: { titleId: '1' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(2);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.postTitle({ body: titleMock }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(3);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getTitles({ query: { titleIds: '1, 2, 3, 4' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(4);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getTitleSeasons({ params: { titleId: '1' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(5);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);
});
