import { IDIContainer } from 'rsdi';
import { Application } from 'express';

import { EpisodeController } from './controller/episodeController';
import { EpisodeService } from './service/episodeService';
import { EpisodeRepository } from './repository/sequelize/episodeRepository';
import { EpisodeModel } from './model/episodeModel';

const episodeModuleInit = (app: Application, container: IDIContainer): void => {
    const episodeController: EpisodeController = container.get('EpisodeController');
    episodeController.configureRoutes(app);
};

export { EpisodeController, EpisodeService, EpisodeRepository, EpisodeModel, episodeModuleInit };
