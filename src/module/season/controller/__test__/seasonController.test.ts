import { SeasonController } from '../seasonController';

import {
    seasonMock,
    resMock,
    seasonServiceMock,
    responseHelperMock,
    responseMock
} from '../../../__test__/testMocks';

// @ts-expect-error
const testController = new SeasonController(seasonServiceMock, responseHelperMock);

beforeEach((): void => {
    jest.clearAllMocks();
});

test('getPaginated method should call corresponding service method', async () => {
    // @ts-expect-error
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, resMock);

    expect(seasonServiceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(seasonServiceMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('getById method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.getById({ params: { seasonId: '1' } }, resMock);

    expect(seasonServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(seasonServiceMock.getById).toHaveBeenCalledWith(1);
});

test('postSeason method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.postSeason({ body: seasonMock }, resMock);

    expect(seasonServiceMock.addSeason).toHaveBeenCalledTimes(1);
    expect(seasonServiceMock.addSeason).toHaveBeenCalledWith(seasonMock);
});

test('getSeasons method should call corresponding service method depending on query props', async () => {
    // @ts-expect-error
    await testController.getSeasons({ query: { limit: '1', offset: '0' } }, resMock);

    expect(seasonServiceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(seasonServiceMock.getPaginated).toHaveBeenCalledWith(1, 0);

    // @ts-expect-error
    await testController.getSeasons({ query: { seasonIds: '1, 2, 3, 4' } }, resMock);

    expect(seasonServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(seasonServiceMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
});

test('getSeasonEpisodes method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.getSeasonEpisodes({ params: { seasonId: '1' } }, resMock);

    expect(seasonServiceMock.getSeasonEpisodes).toHaveBeenCalledTimes(1);
    expect(seasonServiceMock.getSeasonEpisodes).toHaveBeenCalledWith(1);
});


test('controller methods successfully call res.json method with response from responseHelper', async () => {
    // @ts-expect-error
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getById({ params: { seasonId: '1' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(2);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.postSeason({ body: seasonMock }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(3);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getSeasons({ query: { seasonIds: '1, 2, 3, 4' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(4);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);

    // @ts-expect-error
    await testController.getSeasonEpisodes({ params: { seasonId: '1' } }, resMock);

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(5);
    expect(resMock.json).toHaveBeenCalledWith(responseMock);
});
