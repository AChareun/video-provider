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
    },
    getPaginated: jest.fn(() => Promise.resolve([titleMock])),
    getById: jest.fn(() => Promise.resolve(titleMock)),
};

const sendMock = jest.fn();

const testController = new TitleController(serviceMock);

beforeEach((): void => {
    jest.clearAllMocks();
});

test('getPaginated method should call corresponding service method and call send with resolve', async () => {
    // @ts-ignore
    await testController.getPaginated({ query: { limit: '1', offset: '0' } }, { send: sendMock });

    expect(serviceMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(serviceMock.getPaginated).toHaveBeenCalledWith(1, 0);

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(titleMock);
});

test('getById method should call corresponding service method and call send with resolve', async () => {
    // @ts-ignore
    await testController.getById({ params: { titleId: '1' } }, { send: sendMock });

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith(1);

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(titleMock);
});
