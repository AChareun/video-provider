import { TitleService } from '../titleService';
import { TitleCreationAttributes } from '../../model/titleModel';
import { titleRepositoryMock } from '../../../__test__/testMocks';

const testService = new TitleService(titleRepositoryMock);

test('TitleService method getPaginated should call correct TitleRepository method ', () => {
    testService.getPaginated(1, 0);

    expect(titleRepositoryMock.getPaginated).toHaveBeenCalledTimes(1);
    expect(titleRepositoryMock.getPaginated).toHaveBeenCalledWith(1, 0);
});

test('TitleService method getById should call correct TitleRepository method ', () => {
    testService.getById(1);

    expect(titleRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(titleRepositoryMock.getById).toHaveBeenCalledWith(1);

    testService.getById([1, 2, 3, 4]);

    expect(titleRepositoryMock.getById).toHaveBeenCalledTimes(2);
    expect(titleRepositoryMock.getById).toHaveBeenCalledWith([1, 2, 3, 4]);
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

    expect(titleRepositoryMock.addTitle).toHaveBeenCalledTimes(1);
    expect(titleRepositoryMock.addTitle).toHaveBeenCalledWith(mockData);
});

test('TitleService method getTitleSeasons should call correct TitleRepository method', () => {
    testService.getTitleSeasons(1);

    expect(titleRepositoryMock.getTitleSeasons).toHaveBeenCalledTimes(1);
    expect(titleRepositoryMock.getById).toHaveBeenCalledWith(1);
});
