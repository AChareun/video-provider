import { DatabaseError, Op, where } from 'sequelize';

import { AbstractSeasonRepository } from '../abstractSeasonRepository';
import { ResourceNotFoundError } from '../../../error/resourceNotFoundError';
import { GenericDatabaseError } from '../../../error/genericDatabaseError';
import { fromEntityToModel, fromModelToEntity } from '../../mapper/seasonMapper';
import { SeasonModel } from '../../model/seasonModel';
import { Season } from '../../entity/season';
import { TitleModel } from '../../../title/module';
import { Episode } from '../../../episode/entity/episode';
import { EpisodeModel } from '../../../episode/model/episodeModel';
import { fromModelToEntity as fromModelToEntityEpisode } from '../../../episode/mapper/episodeMapper';

export class SeasonRepository extends AbstractSeasonRepository {
    seasonModel: typeof SeasonModel;
    titleModel: typeof TitleModel;

    constructor(seasonModel: typeof SeasonModel, titleModel: typeof TitleModel) {
        super();
        this.seasonModel = seasonModel;
        this.titleModel = titleModel;
    }

    async getPaginated(limit: number, offset: number): Promise<Season[]> {
        try {
            const seasons: SeasonModel[] = await this.seasonModel.findAll({
                limit,
                offset,
            });
            return seasons.map(fromModelToEntity);
        } catch (error) {
            console.log('Error log: ', error);
            if (error instanceof DatabaseError) {
                console.log('SQL Error Parameters: ', error.parameters);
                console.log('SQL Error Query: ', error.sql);
                throw new GenericDatabaseError();
            }
            throw error;
        }
    }

    // /**
    //  * @returns { Array<Title> }
    //  */
    // async searchBy() {
    //     throw new MethodNotImplementedError();
    // }

    async getById(ids: number[]): Promise<Season[]>;
    async getById(id: number): Promise<Season>;
    async getById(id: any): Promise<any> {
        if (Array.isArray(id)) {
            let seasons: any[] = [];

            try {
                const { in: opIn } = Op;
                seasons = await this.seasonModel.findAll({
                    where: { id: { [opIn]: id } },
                });
            } catch (error) {
                console.log('Error log: ', error);
                if (error instanceof DatabaseError) {
                    console.log('SQL Error Parameters: ', error.parameters);
                    console.log('SQL Error Query: ', error.sql);
                    throw new GenericDatabaseError();
                }
                throw error;
            }

            return seasons.map(fromModelToEntity);
        } else {
            let season;

            try {
                season = await this.seasonModel.findByPk(id);
            } catch (error) {
                console.log('Error log: ', error);
                if (error instanceof DatabaseError) {
                    console.log('SQL Error Parameters: ', error.parameters);
                    console.log('SQL Error Query: ', error.sql);
                    throw new GenericDatabaseError();
                }
                throw error;
            }

            if (!season) {
                throw new ResourceNotFoundError();
            }

            return fromModelToEntity(season);
        }
    }

    async addRegistry(data: Season): Promise<Season> {
        const newSeason = this.seasonModel.build(fromEntityToModel(data));
        try {
            await newSeason.save();
        } catch (error) {
            console.log('Error log: ', error);
            if (error instanceof DatabaseError) {
                console.log('SQL Error Parameters: ', error.parameters);
                console.log('SQL Error Query: ', error.sql);
                throw new GenericDatabaseError();
            }
            throw error;
        }

        return fromModelToEntity(newSeason);
    }

    async getSeasonEpisodes(id: number): Promise<Episode[]> {
        let seasonEpisodes: EpisodeModel[];

        try {
            const season = await this.seasonModel.findByPk(id);
            if (season) {
                seasonEpisodes = await season.getEpisodes();
            } else {
                throw new ResourceNotFoundError();
            }
        } catch (error) {
            console.log('Error log: ', error);
            if (error instanceof DatabaseError) {
                console.log('SQL Error Parameters: ', error.parameters);
                console.log('SQL Error Query: ', error.sql);
                throw new GenericDatabaseError();
            }
            throw error;
        }

        return seasonEpisodes.map(fromModelToEntityEpisode);
    }

    async getByExternalId(id: number): Promise<Season> {
        let season;

        try {
            season = await this.seasonModel.findOne({where: {id: id}});
        } catch (error) {
            console.log('Error log: ', error);
            if (error instanceof DatabaseError) {
                console.log('SQL Error Parameters: ', error.parameters);
                console.log('SQL Error Query: ', error.sql);
                throw new GenericDatabaseError();
            }
            throw error;
        }

        if (!season) {
            throw new ResourceNotFoundError();
        }

        return fromModelToEntity(season);
    }
}
