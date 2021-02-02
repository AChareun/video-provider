import { default as DIContainer, factory, object, get } from 'rsdi';
import { Sequelize } from 'sequelize';

import { ApiResponseHelper } from '../lib/apiResponse';
import { TitleController, TitleService, TitleRepository, TitleModel } from '../module/title/module';
import {
    SeasonController,
    SeasonRepository,
    SeasonModel,
    SeasonService,
} from '../module/season/module';

function configureSequelizeDatabase(): Sequelize {
    const sequelize = new Sequelize(`${process.env.DATABASE_URL}`);

    return sequelize;
}

function addCommonDefinitions(container: DIContainer): void {
    container.addDefinitions({
        Sequelize: factory(configureSequelizeDatabase),
        ResponseHelper: object(ApiResponseHelper).construct([]),
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
        TitleController: object(TitleController).construct(
            get('TitleService'),
            get('ResponseHelper')
        ),
    });
}

function configureSeasonModel(container: DIContainer): typeof SeasonModel {
    SeasonModel.setup(container.get<Sequelize>('Sequelize'));
    SeasonModel.setupAssociations(container.get<typeof TitleModel>('TitleModel'));

    return SeasonModel;
}

function addSeasonModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        SeasonModel: factory(configureSeasonModel),
        SeasonRepository: object(SeasonRepository).construct(get('SeasonModel'), get('TitleModel')),
        SeasonService: object(SeasonService).construct(get('SeasonRepository')),
        SeasonController: object(SeasonController).construct(
            get('SeasonService'),
            get('ResponseHelper')
        ),
    });
}

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addCommonDefinitions(container);
    addTitleModuleDefinitions(container);
    addSeasonModuleDefinitions(container);

    return container;
}
