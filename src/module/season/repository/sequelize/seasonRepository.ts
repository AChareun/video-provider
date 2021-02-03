import { DatabaseError, Op } from 'sequelize';

import { AbstractSeasonRepository } from '../abstractSeasonRepository';
import { ResourceNotFoundError } from '../../../error/resourceNotFoundError';
import { GenericDatabaseError } from '../../../error/genericDatabaseError';
import { fromModelToEntity } from '../../mapper/seasonMapper';
import { SeasonCreationAttributes, SeasonModel } from '../../model/seasonModel';
import { Season } from '../../entity/season';
import { TitleModel } from '../../../title/module';

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
                // @ts-expect-error
                include: this.titleModel,
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
                    // @ts-expect-error
                    include: this.titleModel,
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
                // @ts-expect-error
                season = await this.seasonModel.findByPk(id, { include: this.titleModel });
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

    async addSeason(data: SeasonCreationAttributes): Promise<Season> {
        const buildOptions = { include: this.titleModel }
        // @ts-expect-error
        const newSeason = this.seasonModel.build(data, buildOptions);
        newSeason.setDataValue('titleId', data.titleId)
        try{
            await newSeason.save();
        }catch (error) {
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
}
