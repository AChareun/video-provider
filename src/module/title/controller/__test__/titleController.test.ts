import { TitleController } from '../titleController';
import { Title } from '../../entity/title';
import { Season } from '../../../season/entity/season';

const titleMock = new Title({
    id: 1,
    name: 'name',
    synopsis: 'synopsis',
    episodeCount: 1,
    seasonCount: 1,
    sourceImage: 'url',
    premiereDate: new Date(),
    trailerUrl: 'url',
});

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
    titleRepository: {
        getPaginated: jest.fn(() => Promise.resolve([titleMock])),
        getById: jest.fn(() => Promise.resolve(titleMock)),
        addTitle: jest.fn(() => Promise.resolve(titleMock)),
        getTitleSeasons: jest.fn(() => Promise.resolve([seasonMock]))
    },
    getPaginated: jest.fn(() => Promise.resolve([titleMock])),
    getById: jest.fn(() => Promise.resolve(titleMock)),
    addTitle: jest.fn(() => Promise.resolve(titleMock)),
    getTitleSeasons: jest.fn(() => Promise.resolve([seasonMock])),
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
const testController = new TitleController(serviceMock, responseHelperMock);

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
    await testController.getById({ params: { titleId: '1' } }, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith(1);
});

test('postTitle method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.postTitle({ body: titleMock }, resMock);

    expect(serviceMock.addTitle).toHaveBeenCalledTimes(1);
    expect(serviceMock.addTitle).toHaveBeenCalledWith(titleMock);
});

test('getTitles method should call corresponding service method depending on query props', async () => {
    // @ts-expect-error
    await testController.getTitles({ query: { limit: '1', offset: '0' } }, resMock);

    expect(serviceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(serviceMock.getPaginated).toHaveBeenCalledWith(1, 0);

    // @ts-expect-error
    await testController.getTitles({ query: { titleIds: '1, 2, 3, 4' } }, resMock);

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
});

test('getTitleSeasons method should call corresponding service method and call send with resolve', async () => {
    // @ts-expect-error
    await testController.getTitleSeasons({ params: { titleId: '1' } }, resMock);

    expect(serviceMock.getTitleSeasons).toHaveBeenCalledTimes(1);
    expect(serviceMock.getTitleSeasons).toHaveBeenCalledWith(1);
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
