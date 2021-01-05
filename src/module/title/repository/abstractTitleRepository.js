/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * @typedef { import('../entity/title') } Title
 */

const AbstractTitleRepositoryError = require('./error/abstractTitleRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractTitleRepository {
    constructor() {
        if (new.target === AbstractTitleRepository) {
            throw new AbstractTitleRepositoryError();
        }
    }

    /**
     * @param { number } limit
     * @param { number } offset
     * @returns { Array<Title> }
     */
    async getPaginated(limit, offset) {
        throw new MethodNotImplementedError();
    }

    /**
     * @returns { Array<Title> }
     */
    async searchBy() {
        throw new MethodNotImplementedError();
    }

    /**
     * @param { number } id
     * @returns { Title }
     */
    async getById(id) {
        throw new MethodNotImplementedError();
    }
};
