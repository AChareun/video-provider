import { Sequelize } from 'sequelize';

import { SeasonRepository } from '../seasonRepository';
import { ResourceNotFoundError } from '../../../../error/resourceNotFoundError';
import { SeasonCreationAttributes, SeasonModel } from '../../../model/seasonModel';
import { Season } from '../../../entity/season';
import { fromModelToEntity } from '../../../mapper/seasonMapper';
import { TitleModel } from '../../../../title/module';
import { TitleCreationAttributes } from '../../../../title/model/titleModel';

/**
 *
 * TEST SETUP
 *
 */

const testSequelizeInstance = new Sequelize('sqlite::memory:');

let testRepo: SeasonRepository;

let seasonModel: typeof SeasonModel;
let titleModel: typeof TitleModel;

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

const insertSeason = async (): Promise<Season> => {
    const newSeason = await seasonModel.create(fakeNewSeason);
    return fromModelToEntity(newSeason);
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
    seasonModel.setupAssociations(titleModel);
    testRepo = new SeasonRepository(seasonModel, titleModel);
});

beforeEach(
    async (done): Promise<void> => {
        await testSequelizeInstance.sync({ force: true });
        await insertTitle();
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
    const season1 = await insertSeason();
    const season2 = await insertSeason();
    const season3 = await insertSeason();
    const season4 = await insertSeason();

    await expect(testRepo.getById(1)).resolves.toEqual(season1);
    await expect(testRepo.getById(2)).resolves.toEqual(season2);
    await expect(testRepo.getById(3)).resolves.toEqual(season3);
    await expect(testRepo.getById(4)).resolves.toEqual(season4);
});

test('Calling method getById with an array of number returns the requested seasons', async () => {
    const season1 = await insertSeason();
    const season2 = await insertSeason();
    const season3 = await insertSeason();
    const season4 = await insertSeason();

    await expect(testRepo.getById([1, 4])).resolves.toEqual([season1, season4]);
});

test('Method getPaginated returns correct amount of seasons', async () => {
    await expect(testRepo.getPaginated(1, 1)).resolves.toEqual([]);

    const season1 = await insertSeason();
    const season2 = await insertSeason();
    const season3 = await insertSeason();
    const season4 = await insertSeason();

    await expect(testRepo.getPaginated(4, 0)).resolves.toEqual([
        season1,
        season2,
        season3,
        season4,
    ]);
    await expect(testRepo.getPaginated(1, 2)).resolves.toEqual([season3]);
});

test('Method addSeason correctly saves a new record with id 1', async () => {
    const newTitle = await testRepo.addSeason(fakeNewSeason);

    await expect(testRepo.getById(1)).resolves.toEqual(newTitle);
    expect(newTitle.TitleId).toEqual(1);
});