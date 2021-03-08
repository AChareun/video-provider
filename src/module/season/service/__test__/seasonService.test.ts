import { SeasonService } from '../seasonService';
import { seasonRepositoryMock } from '../../../__test__/testMocks';
import { Season } from '../../entity/season';

const testService = new SeasonService(seasonRepositoryMock);

test('SeasonService method getPaginated should call correct SeasonRepository method ', () => {
    testService.getPaginated(1, 0);

    expect(seasonRepositoryMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(seasonRepositoryMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('SeasonService method getById should call correct SeasonRepository method ', () => {
    testService.getById(1);

    expect(seasonRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(seasonRepositoryMock.getById).toHaveBeenCalledWith(1);

    testService.getById([1, 2, 3, 4]);

    expect(seasonRepositoryMock.getById).toHaveBeenCalledTimes(2);
    expect(seasonRepositoryMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
});

test('SeasonService method addSeason should call correct SeasonRepository method', () => {
    const mockData: Season = {
        EpisodeCount: undefined,
        PremiereDate: undefined,
        SeasonId: undefined,
        SeasonName: undefined,
        SeasonNumber: 0,
        SeasonSynopsis: undefined,
        SourceImage: undefined,
        TitleId: 1,
        Trailer: undefined
    };

    testService.addSeason(mockData);

    expect(seasonRepositoryMock.addRegistry).toHaveBeenCalledTimes(1);
    expect(seasonRepositoryMock.addRegistry).toHaveBeenCalledWith(mockData);
});

test('SeasonService method getSeasonEpisodes should call correct SeasonRepository method', () => {
    testService.getSeasonEpisodes(1);

    expect(seasonRepositoryMock.getSeasonEpisodes).toHaveBeenCalledTimes(1);
    expect(seasonRepositoryMock.getById).toHaveBeenCalledWith(1);
});
