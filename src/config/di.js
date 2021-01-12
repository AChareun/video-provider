const { default: DIContainer, factory, object, get } = require('rsdi');
const { Sequelize } = require('sequelize');

const {
    TitleController,
    TitleService,
    TitleRepository,
    TitleModel,
} = require('../module/title/module');

function configureSequelizeDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_PATH,
    });

    return sequelize;
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
    container.addDefinitions({
        Sequelize: factory(configureSequelizeDatabase),
    });
}

/**
 * @param { DIContainer } container
 */
function configureTitleModel(container) {
    TitleModel.setup(container.get('Sequelize'));

    return TitleModel;
}

/**
 * @param { DIContainer } container
 */
function addTitleModuleDefinitions(container) {
    container.addDefinitions({
        TitleModel: factory(configureTitleModel),
        TitleRepository: object(TitleRepository).construct(get('TitleModel')),
        TitleService: object(TitleService).construct(get('TitleRepository')),
        TitleController: object(TitleController).construct(get('TitleService')),
    });
}

module.exports = function configureDI() {
    const container = new DIContainer();

    addCommonDefinitions(container);
    addTitleModuleDefinitions(container);

    return container;
};
