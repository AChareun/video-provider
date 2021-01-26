import { TitleService } from '../titleService';

const repositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
    addTitle: jest.fn(),
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
    const mockData = {
        id: undefined,
        name: 'Title',
        synopsis: 'Synopsis',
        episodeCount: 10,
        seasonCount: 1,
        sourceImage: 'coverUrl',
        premiereDate: new Date(),
        trailerUrl: 'trailerUrl',
    };

    testService.addTitle(mockData);

    expect(repositoryMock.addTitle).toHaveBeenCalledTimes(1);
    expect(repositoryMock.addTitle).toHaveBeenCalledWith(mockData);
});
