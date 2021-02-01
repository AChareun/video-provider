import { Sequelize } from 'sequelize/types';
import { configureDI } from '../config/di';

require('dotenv').config();

const diContainer = configureDI();

const mainDb: Sequelize = diContainer.get('Sequelize');
diContainer.get('TitleModel');

mainDb.sync({ force: true }).catch((error) => {
    console.log(error);
});
