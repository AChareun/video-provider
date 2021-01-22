import { IDIContainer } from 'rsdi';
import { Application } from 'express';

import { TitleController } from './controller/titleController';
import { TitleService } from './service/titleService';
import { TitleRepository } from './repository/sequelize/titleRepository';
import { TitleModel } from './model/titleModel';

const titleModuleInit = (app: Application, container: IDIContainer): void => {
    const titleController: TitleController = container.get('TitleController');
    titleController.configureRoutes(app);
};

export { TitleController, TitleService, TitleRepository, TitleModel, titleModuleInit };
