import { SeasonController } from '../seasonController';
import { Season } from '../../entity/season';

const seasonMock = new Season({
    episodeCount: 10,
    id: 1,
    name: 'Name',
    number: 1,
    premiereDate: new Date(),
    sourceImage: "ImgURL",
    synopsis: "Synopsis",
    titleId: 0,
    trailerUrl: "TrailerUrl"
});

const serviceMock = {
    seasonRepository: {
        getPaginated: jest.fn(() => Promise.resolve([seasonMock])),
        getById: jest.fn(() => Promise.resolve(seasonMock)),
        addSeason: jest.fn(() => Promise.resolve(seasonMock)),
    },
    getPaginated: jest.fn(() => Promise.resolve([seasonMock])),
    getById: jest.fn(() => Promise.resolve(seasonMock)),
    addSeason: jest.fn(() => Promise.resolve(seasonMock)),
};

const responseMock = {
    status: 'status',
    code: 322,
    message: 'message',
    data: null,
};

const responseHelperMock = {
    apiErrors: [],
    buildOkResponse: jest.fn(() => responseMock),
    buildErrorResponse: jest.fn(() => responseMock),
};

const resMock = (() => {
    const res = {
        status: function(){}, json: function(){},
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
})();

// @ts-expect-error
const testController = new SeasonController(serviceMock, responseHelperMock);

beforeEach((): void => {
    jest.clearAllMocks();
});

test('getPaginated method should call corresponding service method', async () => {
    // @ts-expect-error
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, resMock);

    expect(serviceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(serviceMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('getById method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.getById({ params: { seasonId: '1' } }, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith(1);
});

test('postSeason method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.postSeason({ body: seasonMock }, resMock);

    expect(serviceMock.addSeason).toHaveBeenCalledTimes(1);
    expect(serviceMock.addSeason).toHaveBeenCalledWith(seasonMock);
});

test('getSeasons method should call corresponding service method depending on query props', async () => {
    // @ts-expect-error
    await testController.getSeasons({ query: { limit: '1', offset: '0' } }, resMock);

    expect(serviceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(serviceMock.getPaginated).toHaveBeenCalledWith(1, 0);

    // @ts-expect-error
    await testController.getSeasons({ query: { seasonIds: '1, 2, 3, 4' } }, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
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
});
