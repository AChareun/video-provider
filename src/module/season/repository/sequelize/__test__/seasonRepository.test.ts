import { Sequelize } from 'sequelize';

import { SeasonRepository } from '../seasonRepository';
import { ResourceNotFoundError } from '../../../../error/resourceNotFoundError';

import { Season } from '../../../entity/season';
import { SeasonCreationAttributes, SeasonModel } from '../../../model/seasonModel';
import { fromModelToEntity as fromSeasonModelToEntity } from '../../../mapper/seasonMapper';

import { Title } from '../../../../title/entity/title';
import { fromModelToEntity as fromTitleModelToEntity } from '../../../../title/mapper/titleMapper';
import { TitleModel, TitleCreationAttributes } from '../../../../title/model/titleModel';

import { Episode } from '../../../../episode/entity/episode';
import { fromModelToEntity } from '../../../../episode/mapper/episodeMapper';
import { EpisodeCreationAttributes, EpisodeModel } from '../../../../episode/model/episodeModel';

import { fakeNewEpisode, fakeNewSeason, fakeNewTitle } from '../../../../__test__/testMocks';
import { insertModel } from '../../../../__test__/testHelpers';

/**
 *
 * TEST SETUP
 *
 */

const testSequelizeInstance = new Sequelize('sqlite::memory:');

let testRepo: SeasonRepository;

let episodeModel: typeof EpisodeModel;
let seasonModel: typeof SeasonModel;
let titleModel: typeof TitleModel;

beforeAll((): void => {
    titleModel = TitleModel.setup(testSequelizeInstance);
    seasonModel = SeasonModel.setup(testSequelizeInstance);
    episodeModel = EpisodeModel.setup(testSequelizeInstance);
    seasonModel.setupAssociations(titleModel);
    episodeModel.setupAssociations(seasonModel);
    testRepo = new SeasonRepository(seasonModel, titleModel);
});

beforeEach(
    async (done): Promise<void> => {
        await testSequelizeInstance.sync({ force: true });
        // @ts-expect-error
        await insertModel<TitleCreationAttributes, Title>(fakeNewTitle, titleModel, fromTitleModelToEntity);
        done();
    }
);

/**
 *
 * ------------------TESTS----------------------------------------------------------------
 *
 */

test('Trying to get a non-existing Season throws a specific error', async () => {
    try {
        await testRepo.getById(234);
    } catch (error) {
        expect(error).toBeInstanceOf(ResourceNotFoundError);
    }
});

test('Calling method getById with a number returns a single Season with the right id', async () => {
    // @ts-expect-error
    const season1 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season2 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season3 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season4 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);

    await expect(testRepo.getById(1)).resolves.toEqual(season1);
    await expect(testRepo.getById(2)).resolves.toEqual(season2);
    await expect(testRepo.getById(3)).resolves.toEqual(season3);
    await expect(testRepo.getById(4)).resolves.toEqual(season4);
});

test('Calling method getById with an array of number returns the requested seasons', async () => {
    // @ts-expect-error
    const season1 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season2 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season3 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season4 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);

    await expect(testRepo.getById([1, 4])).resolves.toEqual([season1, season4]);
});

test('Method getPaginated returns correct amount of seasons', async () => {
    await expect(testRepo.getPaginated(1, 1)).resolves.toEqual([]);

    // @ts-expect-error
    const season1 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season2 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season3 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season4 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);

    await expect(testRepo.getPaginated(4, 0)).resolves.toEqual([
        season1,
        season2,
        season3,
        season4,
    ]);
    await expect(testRepo.getPaginated(1, 2)).resolves.toEqual([season3]);
});

test('Method addSeason correctly saves a new record with id 1', async () => {
    const mockSeason: Season = {
        EpisodeCount: 1,
        PremiereDate: new Date(),
        SeasonId: undefined,
        SeasonName: '',
        SeasonNumber: 0,
        SeasonSynopsis: 'undefined',
        SourceImage: 'undefined',
        TitleId: 1,
        Trailer: 'undefined'
    }
    const newTitle = await testRepo.addRegistry(mockSeason);

    await expect(testRepo.getById(1)).resolves.toEqual(newTitle);
    expect(newTitle.TitleId).toEqual(1);
});

test('Method getSeasonEpisodes returns the episodes associated with the seasonId', async () => {
    // @ts-expect-error
    const season1 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);
    // @ts-expect-error
    const season2 = await insertModel<SeasonCreationAttributes, Season>(fakeNewSeason, seasonModel, fromSeasonModelToEntity);

    // @ts-expect-error
    const episode1 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);
    // @ts-expect-error
    const episode2 = await insertModel<EpisodeCreationAttributes, Episode>(fakeNewEpisode, episodeModel, fromModelToEntity);

    await expect(testRepo.getSeasonEpisodes(1)).resolves.toEqual([episode1, episode2]);
    await expect(testRepo.getSeasonEpisodes(2)).resolves.toEqual([]);
})

