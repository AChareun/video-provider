import { Sequelize } from 'sequelize';

import { EpisodeRepository } from '../episodeRepository';
import { ResourceNotFoundError } from '../../../../error/resourceNotFoundError';
import { EpisodeCreationAttributes, EpisodeModel } from '../../../model/episodeModel';
import { Episode } from '../../../entity/episode';
import { fromModelToEntity } from '../../../mapper/episodeMapper';
import { Season } from '../../../../season/entity/season';
import { SeasonCreationAttributes, SeasonModel } from '../../../../season/model/seasonModel';
import { fromModelToEntity as fromSeasonModelToEntity } from '../../../../season/mapper/seasonMapper';
import { Title } from '../../../../title/entity/title';
import { TitleModel, TitleCreationAttributes } from '../../../../title/model/titleModel';
import { fromModelToEntity as fromTitleModelToEntity } from '../../../../title/mapper/titleMapper';

import { fakeNewEpisode, fakeNewSeason, fakeNewTitle } from '../../../../__test__/testMocks';
import { insertModel } from '../../../../__test__/testHelpers';


/**
 *
 * TEST SETUP
 *
 */

const testSequelizeInstance = new Sequelize('sqlite::memory:');

let testRepo: EpisodeRepository;

let episodeModel: typeof EpisodeModel;
let seasonModel: typeof SeasonModel;
let titleModel: typeof TitleModel;

beforeAll((): void => {
    titleModel = TitleModel.setup(testSequelizeInstance);
    seasonModel = SeasonModel.setup(testSequelizeInstance);
    episodeModel = EpisodeModel.setup(testSequelizeInstance);

    seasonModel.setupAssociations(titleModel);
    episodeModel.setupAssociations(seasonModel);
    testRepo = new EpisodeRepository(episodeModel, seasonModel);
});

beforeEach(
    async (done): Promise<void> => {
        await testSequelizeInstance.sync({ force: true });
        // @ts-expect-error
        await insertModel<TitleCreationAttributes, Title>(fakeNewTitle, titleModel, fromTitleModelToEntity);
        // @ts-expect-error
        await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
        done();
    }
);

/**
 *
 * ------------------TESTS----------------------------------------------------------------
 *
 */

test('Trying to get a non-existing Episode throws a specific error', async () => {
    try {
        await testRepo.getById(234);
    } catch (error) {
        expect(error).toBeInstanceOf(ResourceNotFoundError);
    }
});

test('Calling method getById with a number returns a single Episode with the right id', async () => {
    // @ts-expect-error
    const episode1 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode2 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode3 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode4 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);

    await expect(testRepo.getById(1)).resolves.toEqual(episode1);
    await expect(testRepo.getById(2)).resolves.toEqual(episode2);
    await expect(testRepo.getById(3)).resolves.toEqual(episode3);
    await expect(testRepo.getById(4)).resolves.toEqual(episode4);
});

test('Calling method getById with an array of number returns the requested episodes', async () => {
    // @ts-expect-error
    const episode1 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode2 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode3 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode4 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);

    await expect(testRepo.getById([1, 4])).resolves.toEqual([episode1, episode4]);
});

test('Method getPaginated returns correct amount of episodes', async () => {
    await expect(testRepo.getPaginated(1, 1)).resolves.toEqual([]);

    // @ts-expect-error
    const episode1 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode2 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode3 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode4 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);

    await expect(testRepo.getPaginated(4, 0)).resolves.toEqual([
        episode1,
        episode2,
        episode3,
        episode4,
    ]);
    await expect(testRepo.getPaginated(1, 2)).resolves.toEqual([episode3]);
});

test('Method addEpisode correctly saves a new record with id 1', async () => {
    const mockEpisode: Episode = {
        Description: '',
        Id: undefined,
        Name: '',
        Number: 0,
        IntroEndTime: 1,
        IntroStartTime: 0,
        Length: 5,
        OutroEndTime: 5,
        OutroStartTime: 4,
        SeasonId: 1,
        Source: '',
    };
    const newEpisode = await testRepo.addEpisode(mockEpisode);

    await expect(testRepo.getById(1)).resolves.toEqual(newEpisode);
    expect(newEpisode.SeasonId).toEqual(1);
});

test('Method getByNumber returns the right episode', async () => {
    // @ts-expect-error
    const episode1 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);

    await expect(testRepo.getByNumber(1, 1, 1)).resolves.toEqual(episode1);

    await expect(testRepo.getByNumber(2, 2, 1)).rejects.toThrowError(ResourceNotFoundError)
});
