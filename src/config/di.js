const { default: DIContainer, factory } = require('rsdi');
const { Sequelize } = require('sequelize');

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

module.exports = function configureDI() {
    const container = new DIContainer();

    addCommonDefinitions(container);

    return container;
};
