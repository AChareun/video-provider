import { Sequelize } from 'sequelize';

import { TitleRepository } from '../titleRepository';
import { ResourceNotFoundError } from '../../../../error/resourceNotFoundError';
import { TitleCreationAttributes, TitleModel } from '../../../model/titleModel';
import { Title } from '../../../entity/title';
import { fromModelToEntity } from '../../../mapper/titleMapper';

/**
 *
 * TEST SETUP
 *
 */

const testSequelizeInstance = new Sequelize('sqlite::memory:');

let testRepo: TitleRepository;

let titleModel: typeof TitleModel;

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

const insertTitle = async (): Promise<Title> => {
    const newTitle = await titleModel.create(fakeNewTitle);
    return fromModelToEntity(newTitle);
};

beforeAll((): void => {
    titleModel = TitleModel.setup(testSequelizeInstance);
    testRepo = new TitleRepository(titleModel);
});

beforeEach(
    async (done): Promise<void> => {
        await testSequelizeInstance.sync({ force: true });
        done();
    }
);

/**
 * ---------------------------------------------------------------------------------------
 * TESTS
 */

test('Trying to get a non-existing Title throws a specific error', async () => {
    try {
        await testRepo.getById(234);
    } catch (error) {
        expect(error).toBeInstanceOf(ResourceNotFoundError);
    }
});

test('Calling method getById with a number returns a single title with the right id', async () => {
    const title1 = await insertTitle();
    const title2 = await insertTitle();
    const title3 = await insertTitle();
    const title4 = await insertTitle();

    await expect(testRepo.getById(1)).resolves.toEqual(title1);
    await expect(testRepo.getById(2)).resolves.toEqual(title2);
    await expect(testRepo.getById(3)).resolves.toEqual(title3);
    await expect(testRepo.getById(4)).resolves.toEqual(title4);
});

test('Calling method getById with an array of number returns the requested titles', async () => {
    const title1 = await insertTitle();
    const title2 = await insertTitle();
    const title3 = await insertTitle();
    const title4 = await insertTitle();

    await expect(testRepo.getById([1, 4])).resolves.toEqual([title1, title4]);
});

test('Method getPaginated returns correct amount of titles', async () => {
    await expect(testRepo.getPaginated(1, 1)).resolves.toEqual([]);

    const title1 = await insertTitle();
    const title2 = await insertTitle();
    const title3 = await insertTitle();
    const title4 = await insertTitle();

    await expect(testRepo.getPaginated(4, 0)).resolves.toEqual([title1, title2, title3, title4]);
    await expect(testRepo.getPaginated(1, 2)).resolves.toEqual([title3]);
});

test('Method addTitle correctly saves a new record with id 1', async () => {
    const newTitle = await testRepo.addTitle(fakeNewTitle);

    await expect(testRepo.getById(1)).resolves.toEqual(newTitle);
});
