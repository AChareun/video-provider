import { TitleService } from '../titleService';
import { TitleCreationAttributes } from '../../model/titleModel';

const repositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
    addTitle: jest.fn(),
    getTitleSeasons: jest.fn(),
};

const testService = new TitleService(repositoryMock);

test('TitleService method getPaginated should call correct TitleRepository method ', () => {
    testService.getPaginated(1, 0);

    expect(repositoryMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('TitleService method getById should call correct TitleRepository method ', () => {
    testService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);

    testService.getById([1, 2, 3, 4]);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(2);
    expect(repositoryMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
});

test('TitleService method addTitle should call correct TitleRepository method', () => {
    const mockData: TitleCreationAttributes = {
        episodeCount: undefined,
        id: undefined,
        name: '',
        premiereDate: undefined,
        seasonCount: undefined,
        sourceImage: undefined,
        synopsis: undefined,
        trailerUrl: undefined,
    };

    // @ts-expect-error
    testService.addTitle(mockData);

    expect(repositoryMock.addTitle).toHaveBeenCalledTimes(1);
    expect(repositoryMock.addTitle).toHaveBeenCalledWith(mockData);
});

test('TitleService method getTitleSeasons should call correct TitleRepository method', () => {
    testService.getTitleSeasons(1);

    expect(repositoryMock.getTitleSeasons).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
});
