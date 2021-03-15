import { default as DIContainer, factory, object, get } from 'rsdi';
import { Sequelize } from 'sequelize';

import { ApiResponseHelper } from '../lib/apiResponse';
import { JikanApiAdapter } from '../module/animeApi/jikan/jikanApiAdapter';
import { TitleController, TitleService, TitleRepository, TitleModel } from '../module/title/module';
import {
    SeasonController,
    SeasonRepository,
    SeasonModel,
    SeasonService,
} from '../module/season/module';
import {
    EpisodeController,
    EpisodeModel,
    EpisodeRepository,
    EpisodeService,
} from '../module/episode/module';
import { CacheManager } from '../module/cache/cacheManager';

function configureSequelizeDatabase(): Sequelize {
    const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
        ssl: true,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    });

    return sequelize;
}

function addCommonDefinitions(container: DIContainer): void {
    container.addDefinitions({
        Sequelize: factory(configureSequelizeDatabase),
        ResponseHelper: object(ApiResponseHelper).construct([]),
        ExternalApiAdapter: object(JikanApiAdapter).construct(),
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
        TitleCacheManager: object(CacheManager).construct(
            get('ExternalApiAdapter'),
            get('TitleRepository')
        ),
        TitleService: object(TitleService).construct(
            get('TitleRepository'),
            get('ExternalApiAdapter'),
            get('TitleCacheManager')
        ),
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

function configureEpisodeModel(container: DIContainer): typeof EpisodeModel {
    EpisodeModel.setup(container.get<Sequelize>('Sequelize'));
    EpisodeModel.setupAssociations(container.get<typeof SeasonModel>('SeasonModel'));

    return EpisodeModel;
}

function addEpisodeModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        EpisodeModel: factory(configureEpisodeModel),
        EpisodeRepository: object(EpisodeRepository).construct(
            get('EpisodeModel'),
            get('SeasonModel')
        ),
        EpisodeService: object(EpisodeService).construct(get('EpisodeRepository')),
        EpisodeController: object(EpisodeController).construct(
            get('EpisodeService'),
            get('ResponseHelper')
        ),
    });
}

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addCommonDefinitions(container);
    addTitleModuleDefinitions(container);
    addSeasonModuleDefinitions(container);
    addEpisodeModuleDefinitions(container);

    return container;
}
