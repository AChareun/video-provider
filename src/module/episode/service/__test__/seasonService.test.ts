import { EpisodeService } from '../episodeService';
import { EpisodeCreationAttributes } from '../../model/episodeModel';

const repositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
    addEpisode: jest.fn(),
};

const testService = new EpisodeService(repositoryMock);

test('EpisodeService method getPaginated should call correct EpisodeRepository method ', () => {
    testService.getPaginated(1, 0);

    expect(repositoryMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('EpisodeService method getById should call correct EpisodeRepository method ', () => {
    testService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);

    testService.getById([1, 2, 3, 4]);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(2);
    expect(repositoryMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
});

test('EpisodeService method addEpisode should call correct EpisodeRepository method', () => {
    const mockData: EpisodeCreationAttributes = {
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
    };

    testService.addEpisode(mockData);

    expect(repositoryMock.addEpisode).toHaveBeenCalledTimes(1);
    expect(repositoryMock.addEpisode).toHaveBeenCalledWith(mockData);
});
