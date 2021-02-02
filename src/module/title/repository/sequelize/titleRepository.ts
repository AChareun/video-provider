import { AbstractTitleRepository } from '../abstractTitleRepository';
import { ResourceNotFoundError } from '../../../error/resourceNotFoundError';
import { fromModelToEntity } from '../../mapper/titleMapper';
import { TitleModel } from '../../model/titleModel';
import { Title } from '../../entity/title';
import { DatabaseError, Op } from 'sequelize';
import { GenericDatabaseError } from '../error/genericDatabaseError';

export class TitleRepository extends AbstractTitleRepository {
    titleModel: typeof TitleModel;

    constructor(titleModel: typeof TitleModel) {
        super();
        this.titleModel = titleModel;
    }

    async getPaginated(limit: number, offset: number): Promise<Title[]> {
        try {
            const titles: TitleModel[] = await this.titleModel.findAll({ limit, offset });
            return titles.map(fromModelToEntity);
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

    async getById(ids: number[]): Promise<Title[]>;
    async getById(id: number): Promise<Title>;
    async getById(id: any): Promise<any> {
        if (Array.isArray(id)) {
            let titles: any[] = [];

            try {
                const { in: opIn } = Op;
                titles = await this.titleModel.findAll({ where: { id: { [opIn]: id } } });
            } catch (error) {
                console.log('Error log: ', error);
                if (error instanceof DatabaseError) {
                    console.log('SQL Error Parameters: ', error.parameters);
                    console.log('SQL Error Query: ', error.sql);
                    throw new GenericDatabaseError();
                }
                throw error;
            }

            return titles.map(fromModelToEntity);
        } else {
            let title;

            try {
                title = await this.titleModel.findByPk(id);
            } catch (error) {
                console.log('Error log: ', error);
                if (error instanceof DatabaseError) {
                    console.log('SQL Error Parameters: ', error.parameters);
                    console.log('SQL Error Query: ', error.sql);
                    throw new GenericDatabaseError();
                }
                throw error;
            }

            if (!title) {
                throw new ResourceNotFoundError();
            }

            return fromModelToEntity(title);
        }
    }

    async addTitle(data: any): Promise<Title> {
        const newTitle = this.titleModel.build(data);
        try {
            await newTitle.save();
        } catch (error) {
            console.log('Error log: ', error);
            if (error instanceof DatabaseError) {
                console.log('SQL Error Parameters: ', error.parameters);
                console.log('SQL Error Query: ', error.sql);
                throw new GenericDatabaseError();
            }
            throw error;
        }

        return fromModelToEntity(newTitle);
    }
}
