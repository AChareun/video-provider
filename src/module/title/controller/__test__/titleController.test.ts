import { TitleRepository } from '../../module';
import { TitleController } from '../titleController';
import { Title } from '../../entity/title';

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

const serviceMock = {
    titleRepository: {
        getPaginated: jest.fn(() => Promise.resolve([titleMock])),
        getById: jest.fn(() => Promise.resolve(titleMock)),
        addTitle: jest.fn(() => Promise.resolve(titleMock)),
    },
    getPaginated: jest.fn(() => Promise.resolve([titleMock])),
    getById: jest.fn(() => Promise.resolve(titleMock)),
    addTitle: jest.fn(() => Promise.resolve(titleMock)),
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

const resJsonMock = jest.fn();

const testController = new TitleController(serviceMock, responseHelperMock);

beforeEach((): void => {
    jest.clearAllMocks();
});

test('getPaginated method should call corresponding service method', async () => {
    // @ts-ignore
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, { json: resJsonMock });

    expect(serviceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(serviceMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('getById method should call corresponding service method and call send with resolve', async () => {
    // @ts-ignore
    await testController.getById({ params: { titleId: '1' } }, { json: resJsonMock });

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith(1);
});

test('postTitle method should call corresponding service method and call send with resolve', async () => {
    // @ts-ignore
    await testController.postTitle({ body: titleMock }, { json: resJsonMock });

    expect(serviceMock.addTitle).toHaveBeenCalledTimes(1);
    expect(serviceMock.addTitle).toHaveBeenCalledWith(titleMock);
});

test('controller methods successfully call res.json method with response from responseHelper', async () => {
    // @ts-ignore
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, { json: resJsonMock });

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(1);
    expect(resJsonMock).toHaveBeenCalledWith(responseMock);

    // @ts-ignore
    await testController.getById({ params: { titleId: '1' } }, { json: resJsonMock });

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(2);
    expect(resJsonMock).toHaveBeenCalledWith(responseMock);

    // @ts-ignore
    await testController.postTitle({ body: titleMock }, { json: resJsonMock });

    expect(responseHelperMock.buildOkResponse).toHaveBeenCalledTimes(3);
    expect(resJsonMock).toHaveBeenCalledWith(responseMock);
});
