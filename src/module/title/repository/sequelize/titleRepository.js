/**
 * @typedef { import('../../entity/title') } Title
 * @typedef { import('../../model/titleModel') } TitleModel
 */

const AbstractTitleRepository = require('../abstractTitleRepository');
const TitleNotFoundError = require('../error/titleNotFoundError');
const { fromModelToEntity } = require('../../mapper/titleMapper');

module.exports = class TitleRepository extends AbstractTitleRepository {
    /**
     * @param {TitleModel} titleModel
     */
    constructor(titleModel) {
        super();
        this.titleModel = titleModel;
    }

    /**
     * @param { number } limit
     * @param { number } offset
     * @returns { Array<Title> }
     */
    async getPaginated(limit, offset) {
        const titles = await this.titleModel.findAll({ limit, offset });
        return titles.map(fromModelToEntity);
    }

    // /**
    //  * @returns { Array<Title> }
    //  */
    // async searchBy() {
    //     throw new MethodNotImplementedError();
    // }

    /**
     * @param { number } id
     * @returns { Title }
     */
    async getById(id) {
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
};
