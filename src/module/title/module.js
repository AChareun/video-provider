/**
 * @typedef { import('express').Application } ExpressApp
 * @typedef { import('rsdi').IDIContainer } IDIContainer
 */

const TitleController = require('./controller/titleController');
const TitleService = require('./service/titleService');
const TitleRepository = require('./repository/sequelize/titleRepository');
const TitleModel = require('./model/titleModel');

/**
 * @param { ExpressApp } app
 * @param { IDIContainer } container
 */
const titleModuleInit = (app, container) => {
    /**
     * @type { TitleController } titleController
     */
    const titleController = container.get('TitleController');
    titleController.configureRoutes(app);
};

module.exports = {
    TitleController,
    TitleService,
    TitleRepository,
    TitleModel,
    titleModuleInit,
};
