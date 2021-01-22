import { Sequelize } from 'sequelize';

import { TitleModel } from '../titleModel';

const sequelizeInstance = new Sequelize('sqlite::memory:');

test('TitleModel setup creates Titles table on database', async (): Promise<void> => {
    TitleModel.setup(sequelizeInstance);

    await sequelizeInstance.sync({ force: true });

    await expect(TitleModel.findAll()).resolves.toEqual([]);
});
