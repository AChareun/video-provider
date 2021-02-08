import { Sequelize } from 'sequelize';

import { EpisodeRepository } from '../episodeRepository';
import { ResourceNotFoundError } from '../../../../error/resourceNotFoundError';
import { EpisodeCreationAttributes, EpisodeModel } from '../../../model/episodeModel';
import { Episode } from '../../../entity/episode';
import { fromModelToEntity } from '../../../mapper/episodeMapper';
import { SeasonCreationAttributes, SeasonModel } from '../../../../season/model/seasonModel';
import { TitleModel, TitleCreationAttributes } from '../../../../title/model/titleModel';

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

const fakeNewEpisode: EpisodeCreationAttributes = {
    description: 'Description',
    episodeNumber: 1,
    id: undefined,
    introEndTime: 120,
    introStartTime: 60,
    length: 620,
    name: 'Name',
    outroEndTime: 610,
    outroStartTime: 580,
    seasonId: 1,
    sourcePath: 'videoUrl',
};

const insertEpisode = async (): Promise<Episode> => {
    const newEpisode = await episodeModel.create(fakeNewEpisode);
    return fromModelToEntity(newEpisode);
};

const fakeNewSeason: SeasonCreationAttributes = {
    episodeCount: 10,
    id: undefined,
    name: 'Season Name',
    premiereDate: new Date(),
    seasonNumber: 1,
    sourceImage: 'Source Image',
    synopsis: 'Synopsis',
    titleId: 1,
    trailerUrl: 'Trailer URL',
};

const insertSeason = async (): Promise<void> => {
    await seasonModel.create(fakeNewSeason);
};

const fakeNewTitle: TitleCreationAttributes = {
    id: undefined,
    name: 'Title',
    synopsis: 'Synopsis',
    episodeCount: 10,
    seasonCount: 1,
    sourceImage: 'coverUrl',
    premiereDate: new Date(),
    trailerUrl: 'trailerUrl',
};

const insertTitle = async (): Promise<void> => {
    await titleModel.create(fakeNewTitle);
};

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
        await insertTitle();
        await insertSeason();
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
    const episode1 = await insertEpisode();
    const episode2 = await insertEpisode();
    const episode3 = await insertEpisode();
    const episode4 = await insertEpisode();

    await expect(testRepo.getById(1)).resolves.toEqual(episode1);
    await expect(testRepo.getById(2)).resolves.toEqual(episode2);
    await expect(testRepo.getById(3)).resolves.toEqual(episode3);
    await expect(testRepo.getById(4)).resolves.toEqual(episode4);
});

test('Calling method getById with an array of number returns the requested episodes', async () => {
    const episode1 = await insertEpisode();
    const episode2 = await insertEpisode();
    const episode3 = await insertEpisode();
    const episode4 = await insertEpisode();

    await expect(testRepo.getById([1, 4])).resolves.toEqual([episode1, episode4]);
});

test('Method getPaginated returns correct amount of episodes', async () => {
    await expect(testRepo.getPaginated(1, 1)).resolves.toEqual([]);

    const episode1 = await insertEpisode();
    const episode2 = await insertEpisode();
    const episode3 = await insertEpisode();
    const episode4 = await insertEpisode();

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
    const episode1 = await insertEpisode();

    await expect(testRepo.getByNumber(1, 1, 1)).resolves.toEqual(episode1);
});
