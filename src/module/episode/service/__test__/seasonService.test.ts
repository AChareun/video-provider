import { EpisodeService } from '../episodeService';
import { EpisodeCreationAttributes } from '../../model/episodeModel';
import { Episode } from '../../entity/episode';

const repositoryMock = {
    getPaginated: jest.fn(),
    getById: jest.fn(),
    addEpisode: jest.fn(),
    getByNumber: jest.fn(),
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
    const mockData: Episode = {
        Description: 'undefined',
        Id: undefined,
        IntroEndTime: 2,
        IntroStartTime: 1,
        Length: 5,
        Name: 'undefined',
        Number: 0,
        OutroEndTime: 2,
        OutroStartTime: 1,
        SeasonId: 0,
        Source: 'undefined'
    };

    testService.addEpisode(mockData);

    expect(repositoryMock.addEpisode).toHaveBeenCalledTimes(1);
    expect(repositoryMock.addEpisode).toHaveBeenCalledWith(mockData);
});

test('EpisodeService method getByNumber should call correct EpisodeRepository method', () => {
    testService.getByNumber(1, 1, 1);

    expect(repositoryMock.getByNumber).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getByNumber).toHaveBeenCalledWith(1, 1, 1);
})
