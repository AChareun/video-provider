const { Sequelize } = require('sequelize');

const TitleRepository = require('../titleRepository');
const TitleNotFoundError = require('../../error/titleNotFoundError');
const TitleModel = require('../../../model/titleModel');
const Title = require('../../../entity/title');
const { fromModelToEntity } = require('../../../mapper/titleMapper');

/**
 *
 * TEST SETUP
 *
 */

const testSequelizeInstance = new Sequelize('sqlite::memory:');
/**
 * @type {TitleRepository} testRepo
 */
let testRepo;

/**
 * @type {TitleModel} titleModel
 */
let titleModel;

const fakeNewTitle = new Title({
    name: 'Title',
    synopsis: 'Synopsis',
    episodeCount: 10,
    seasonCount: 1,
    sourceImage: 'coverUrl',
    premiereDate: new Date(),
    trailerUrl: 'trailerUrl',
});

const insertTitle = async () => {
    const newTitle = await titleModel.create(fakeNewTitle);
    return fromModelToEntity(newTitle);
};

beforeAll(() => {
    titleModel = TitleModel.setup(testSequelizeInstance);
    testRepo = new TitleRepository(titleModel);
});

beforeEach(async (done) => {
    await testSequelizeInstance.sync({ force: true });
    done();
});

/**
 * ---------------------------------------------------------------------------------------
 * TESTS
 */

test('Trying to get a non-existing Title throws a specific error', async () => {
    try {
        await testRepo.getById(234);
    } catch (error) {
        expect(error).toBeInstanceOf(TitleNotFoundError);
    }
});

test('Method getById returns the correct Title', async () => {
    const title1 = await insertTitle();
    const title2 = await insertTitle();
    const title3 = await insertTitle();
    const title4 = await insertTitle();

    await expect(testRepo.getById(1)).resolves.toEqual(title1);
    await expect(testRepo.getById(2)).resolves.toEqual(title2);
    await expect(testRepo.getById(3)).resolves.toEqual(title3);
    await expect(testRepo.getById(4)).resolves.toEqual(title4);
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
