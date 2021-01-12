require('dotenv').config();

const configureDI = require('../config/di');

const diContainer = configureDI();

/**
 * @type {import('sequelize').Sequelize} mainDb
 */
const mainDb = diContainer.get('Sequelize');
diContainer.get('TitleModel');
mainDb.sync();
