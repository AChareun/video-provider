import { EpisodeController } from '../episodeController';

import { episodeMock, episodeServiceMock, resMock, responseHelperMock, responseMock } from '../../../__test__/testMocks';

// @ts-expect-error
const testController = new EpisodeController(episodeServiceMock, responseHelperMock);

beforeEach((): void => {
    jest.clearAllMocks();
});

test('getPaginated method should call corresponding service method', async () => {
    // @ts-expect-error
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, resMock);

    expect(episodeServiceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(episodeServiceMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('getById method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.getById({ params: { episodeId: '1' } }, resMock);

    expect(episodeServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(episodeServiceMock.getById).toHaveBeenCalledWith(1);
});

test('postEpisode method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.postEpisode({ body: episodeMock }, resMock);

    expect(episodeServiceMock.addEpisode).toHaveBeenCalledTimes(1);
    expect(episodeServiceMock.addEpisode).toHaveBeenCalledWith(episodeMock);
});

test('getEpisodes method should call corresponding service method depending on query props', async () => {
    // @ts-expect-error
    await testController.getEpisodes({ query: { limit: '1', offset: '0' } }, resMock);

    expect(episodeServiceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(episodeServiceMock.getPaginated).toHaveBeenCalledWith(1, 0);

    // @ts-expect-error
    await testController.getEpisodes({ query: { episodeIds: '1, 2, 3, 4' } }, resMock);

    expect(episodeServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(episodeServiceMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);

    // @ts-expect-error
    await testController.getByNumber({ query: { titleId: '1', seasonNm: '1', number: '1' } }, resMock);

    expect(episodeServiceMock.getByNumber).toHaveBeenCalledTimes(1);
    expect(episodeServiceMock.getByNumber).toHaveBeenCalledWith(1, 1, 1);
});


test('controller methods successfully call res.json method with response from responseHelper', async () => {
    // @ts-expect-error
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getById({ params: { episodeId: '1' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(2);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.postEpisode({ body: episodeMock }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(3);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getEpisodes({ query: { episodeIds: '1, 2, 3, 4' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(4);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getByNumber({ query: { titleId: '1', seasonNm: '1', number: '1' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(5);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);
});
