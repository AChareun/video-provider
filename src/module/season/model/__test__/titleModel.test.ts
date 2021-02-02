import { Sequelize } from 'sequelize';

import { SeasonModel } from '../seasonModel';
import { TitleModel } from '../../../title/module';

const sequelizeInstance = new Sequelize('sqlite::memory:');

test('SeasonModel setup creates Season table on database', async (): Promise<void> => {
    SeasonModel.setup(sequelizeInstance);

    await sequelizeInstance.sync({ force: true });

    await expect(SeasonModel.findAll()).resolves.toEqual([]);
});

test('SeasonModel setupAssociations creates a column titleId on Season table', async (): Promise <void> => {
    TitleModel.setup(sequelizeInstance);
    SeasonModel.setup(sequelizeInstance);
    SeasonModel.setupAssociations(TitleModel);

    await sequelizeInstance.sync({ force: true });

    // @ts-expect-error
    await expect(SeasonModel.findAll({include: [TitleModel]})).resolves.toEqual([]);
})
