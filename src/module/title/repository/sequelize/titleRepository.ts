import { AbstractTitleRepository } from '../abstractTitleRepository';
import { TitleNotFoundError } from '../error/titleNotFoundError';
import { fromModelToEntity } from '../../mapper/titleMapper';
import { TitleModel } from '../../model/titleModel';
import { Title } from '../../entity/title';
import { Op } from 'sequelize';

export class TitleRepository extends AbstractTitleRepository {
    titleModel: typeof TitleModel;

    constructor(titleModel: typeof TitleModel) {
        super();
        this.titleModel = titleModel;
    }

    async getPaginated(limit: number, offset: number): Promise<Array<Title>> {
        const titles: Array<Object> = await this.titleModel.findAll({ limit, offset });
        return titles.map(fromModelToEntity);
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
                const { in: opIn } = Op
                titles = await this.titleModel.findAll({ where: { id: { [opIn]: id } } });
            } catch (error) {
                console.log(error);
            }

            return titles.map(fromModelToEntity);
        } else {
            let title;

            try {
                title = await this.titleModel.findByPk(id);
            } catch (error) {
                console.log(error);
            }

            if (!title) {
                throw new TitleNotFoundError();
            }

            return fromModelToEntity(title);
        }
    }

    async addTitle(data: Title): Promise<Title> {
        const newTitle = this.titleModel.build(data);
        try {
            await newTitle.save();
        } catch (error) {
            console.log(error);
        }

        return fromModelToEntity(newTitle);
    }
}
