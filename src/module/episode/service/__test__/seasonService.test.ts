import { EpisodeService } from '../episodeService';
import { Episode } from '../../entity/episode';

import { episodeRepositoryMock } from '../../../__test__/testMocks';

const testService = new EpisodeService(episodeRepositoryMock);

test('EpisodeService method getPaginated should call correct EpisodeRepository method ', () => {
    testService.getPaginated(1, 0);

    expect(episodeRepositoryMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(episodeRepositoryMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('EpisodeService method getById should call correct EpisodeRepository method ', () => {
    testService.getById(1);

    expect(episodeRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(episodeRepositoryMock.getById).toHaveBeenCalledWith(1);

    testService.getById([1, 2, 3, 4]);

    expect(episodeRepositoryMock.getById).toHaveBeenCalledTimes(2);
    expect(episodeRepositoryMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
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

    expect(episodeRepositoryMock.addRegistry).toHaveBeenCalledTimes(1);
    expect(episodeRepositoryMock.addRegistry).toHaveBeenCalledWith(mockData);
});

test('EpisodeService method getByNumber should call correct EpisodeRepository method', () => {
    testService.getByNumber(1, 1, 1);

    expect(episodeRepositoryMock.getByNumber).toHaveBeenCalledTimes(1);
    expect(episodeRepositoryMock.getByNumber).toHaveBeenCalledWith(1, 1, 1);
})
