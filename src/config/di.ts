import { default as DIContainer, factory, object, get } from 'rsdi';
import { Sequelize } from 'sequelize';

import { TitleController, TitleService, TitleRepository, TitleModel } from '../module/title/module';

function configureSequelizeDatabase(): Sequelize {
    const sequelize = new Sequelize(`${process.env.DATABASE_URL}`);

    return sequelize;
}

function addCommonDefinitions(container: DIContainer): void {
    container.addDefinitions({
        Sequelize: factory(configureSequelizeDatabase),
    });
}

function configureTitleModel(container: DIContainer): typeof TitleModel {
    TitleModel.setup(container.get('Sequelize'));

    return TitleModel;
}

function addTitleModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        TitleModel: factory(configureTitleModel),
        TitleRepository: object(TitleRepository).construct(get('TitleModel')),
        TitleService: object(TitleService).construct(get('TitleRepository')),
        TitleController: object(TitleController).construct(get('TitleService')),
    });
}

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addCommonDefinitions(container);
    addTitleModuleDefinitions(container);

    return container;
};
