import { EpisodeController } from '../episodeController';
import { Episode } from '../../entity/episode';

const episodeMock = new Episode({
    description: undefined,
    episodeNumber: 0,
    id: 0,
    introEndTime: undefined,
    introStartTime: undefined,
    length: undefined,
    name: undefined,
    outroEndTime: undefined,
    outroStartTime: undefined,
    seasonId: 0,
    sourcePath: undefined
});

const serviceMock = {
    episodeRepository: {
        getPaginated: jest.fn(() => Promise.resolve([episodeMock])),
        getById: jest.fn(() => Promise.resolve(episodeMock)),
        addEpisode: jest.fn(() => Promise.resolve(episodeMock)),
    },
    getPaginated: jest.fn(() => Promise.resolve([episodeMock])),
    getById: jest.fn(() => Promise.resolve(episodeMock)),
    addEpisode: jest.fn(() => Promise.resolve(episodeMock)),
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
const testController = new EpisodeController(serviceMock, responseHelperMock);

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
    await testController.getById({ params: { episodeId: '1' } }, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith(1);
});

test('postEpisode method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.postEpisode({ body: episodeMock }, resMock);

    expect(serviceMock.addEpisode).toHaveBeenCalledTimes(1);
    expect(serviceMock.addEpisode).toHaveBeenCalledWith(episodeMock);
});

test('getEpisodes method should call corresponding service method depending on query props', async () => {
    // @ts-expect-error
    await testController.getEpisodes({ query: { limit: '1', offset: '0' } }, resMock);

    expect(serviceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(serviceMock.getPaginated).toHaveBeenCalledWith(1, 0);

    // @ts-expect-error
    await testController.getEpisodes({ query: { episodeIds: '1, 2, 3, 4' } }, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
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
});
