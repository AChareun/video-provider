import { Sequelize } from 'sequelize';

import { EpisodeModel } from '../episodeModel';
import { SeasonModel } from '../../../season/module';

const sequelizeInstance = new Sequelize('sqlite::memory:');

test('EpisodeModel setup creates Episode table on database', async (): Promise<void> => {
    EpisodeModel.setup(sequelizeInstance);

    await sequelizeInstance.sync({ force: true });

    await expect(EpisodeModel.findAll()).resolves.toEqual([]);
});

test('EpisodeModel setupAssociations creates a column seasonId on Episode table', async (): Promise <void> => {
    SeasonModel.setup(sequelizeInstance);
    EpisodeModel.setup(sequelizeInstance);
    EpisodeModel.setupAssociations(SeasonModel);

    await sequelizeInstance.sync({ force: true });

    // @ts-expect-error
    await expect(EpisodeModel.findAll({include: [SeasonModel]})).resolves.toEqual([]);
})
