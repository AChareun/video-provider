import { DatabaseError, Op } from 'sequelize';

import { AbstractEpisodeRepository } from '../abstractEpisodeRepository';
import { ResourceNotFoundError } from '../../../error/resourceNotFoundError';
import { GenericDatabaseError } from '../../../error/genericDatabaseError';
import { fromEntityToModel, fromModelToEntity } from '../../mapper/episodeMapper';
import { EpisodeModel } from '../../model/episodeModel';
import { Episode } from '../../entity/episode';
import { SeasonModel } from '../../../season/module';

export class EpisodeRepository extends AbstractEpisodeRepository {
    episodeModel: typeof EpisodeModel;
    seasonModel: typeof SeasonModel;

    constructor(episodeModel: typeof EpisodeModel, seasonModel: typeof SeasonModel) {
        super();
        this.episodeModel = episodeModel;
        this.seasonModel = seasonModel;
    }

    async getPaginated(limit: number, offset: number): Promise<Episode[]> {
        try {
            const episodes: EpisodeModel[] = await this.episodeModel.findAll({
                limit,
                offset,
            });
            return episodes.map(fromModelToEntity);
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

    async getById(ids: number[]): Promise<Episode[]>;
    async getById(id: number): Promise<Episode>;
    async getById(id: any): Promise<any> {
        if (Array.isArray(id)) {
            let episodes: EpisodeModel[];

            try {
                const { in: opIn } = Op;
                episodes = await this.episodeModel.findAll({
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

            return episodes.map(fromModelToEntity);
        } else {
            let episode: EpisodeModel | null;

            try {
                episode = await this.episodeModel.findByPk(id);
            } catch (error) {
                console.log('Error log: ', error);
                if (error instanceof DatabaseError) {
                    console.log('SQL Error Parameters: ', error.parameters);
                    console.log('SQL Error Query: ', error.sql);
                    throw new GenericDatabaseError();
                }
                throw error;
            }

            if (!episode) {
                throw new ResourceNotFoundError();
            }

            return fromModelToEntity(episode);
        }
    }

    async addRegistry(data: Episode): Promise<Episode> {
        const newEpisode = this.episodeModel.build(fromEntityToModel(data));
        try {
            await newEpisode.save();
        } catch (error) {
            console.log('Error log: ', error);
            if (error instanceof DatabaseError) {
                console.log('SQL Error Parameters: ', error.parameters);
                console.log('SQL Error Query: ', error.sql);
                throw new GenericDatabaseError();
            }
            throw error;
        }

        return fromModelToEntity(newEpisode);
    }

    async getByNumber(
        titleId: number,
        seasonNumber: number,
        episodeNumber: number
    ): Promise<Episode> {
        let episode: EpisodeModel | null;

        try {
            episode = await this.episodeModel.findOne({
                where: {
                    episodeNumber,
                    seasonId: await this.seasonModel
                        .findOne({
                            where: {
                                titleId,
                                seasonNumber,
                            },
                        })
                        .then((r) => r?.id || null),
                },
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

        if (!episode) {
            throw new ResourceNotFoundError();
        }

        return fromModelToEntity(episode);
    }

    async getByName(name: string): Promise<Episode> {
        let episode: EpisodeModel | null;

        try {
            episode = await this.episodeModel.findOne({where: {name: name}});
        } catch (error) {
            console.log('Error log: ', error);
            if (error instanceof DatabaseError) {
                console.log('SQL Error Parameters: ', error.parameters);
                console.log('SQL Error Query: ', error.sql);
                throw new GenericDatabaseError();
            }
            throw error;
        }

        if (!episode) {
            throw new ResourceNotFoundError();
        }

        return fromModelToEntity(episode);
    }
}
