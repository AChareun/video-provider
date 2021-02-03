import { Sequelize } from 'sequelize/types';
import { configureDI } from '../config/di';

require('dotenv').config();

const diContainer = configureDI();

const mainDb: Sequelize = diContainer.get('Sequelize');
diContainer.get('TitleModel');
diContainer.get('SeasonModel');
diContainer.get('EpisodeModel');

mainDb.sync().catch((error) => {
    console.log(error)
});
