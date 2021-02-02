import { IDIContainer } from 'rsdi';
import { Application } from 'express';

import { SeasonController } from './controller/seasonController';
import { SeasonService } from './service/seasonService';
import { SeasonRepository } from './repository/sequelize/seasonRepository';
import { SeasonModel } from './model/seasonModel';

const seasonModuleInit = (app: Application, container: IDIContainer): void => {
    const seasonController: SeasonController = container.get('SeasonController');
    seasonController.configureRoutes(app);
};

export { SeasonController, SeasonService, SeasonRepository, SeasonModel, seasonModuleInit };
