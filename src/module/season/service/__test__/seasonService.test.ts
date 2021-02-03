import { SeasonService } from '../seasonService';
import { SeasonCreationAttributes } from '../../model/seasonModel';

const repositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
    addSeason: jest.fn(),
};

const testService = new SeasonService(repositoryMock);

test('SeasonService method getPaginated should call correct SeasonRepository method ', () => {
    testService.getPaginated(1, 0);

    expect(repositoryMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('SeasonService method getById should call correct SeasonRepository method ', () => {
    testService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);

    testService.getById([1, 2, 3, 4]);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(2);
    expect(repositoryMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
});

test('SeasonService method addSeason should call correct SeasonRepository method', () => {
    const mockData: SeasonCreationAttributes = {
        episodeCount: 10,
        id: undefined,
        name: 'Name',
        premiereDate: new Date(),
        seasonNumber: 1,
        sourceImage: 'ImgURL',
        synopsis: 'Synopsis',
        titleId: 1,
        trailerUrl: 'trailerUrl',
    };

    testService.addSeason(mockData);

    expect(repositoryMock.addSeason).toHaveBeenCalledTimes(1);
    expect(repositoryMock.addSeason).toHaveBeenCalledWith(mockData);
});
