const { Sequelize } = require('sequelize');

const TitleModel = require('../titleModel');

const sequelizeInstance = new Sequelize('sqlite::memory:');

test('TitleModel setup creates Titles table on database', async () => {
    TitleModel.setup(sequelizeInstance);

    await sequelizeInstance.sync({ force: true });

    await expect(TitleModel.findAll()).resolves.toEqual([]);
});
