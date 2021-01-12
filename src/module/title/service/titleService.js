/**
 * @typedef { import('../repository/abstractTitleRepository') } AbstractTitleRepository
 * @typedef { import('../entity/title') } Title
 */

module.exports = class TitleService {
    /**
     * @param {AbstractTitleRepository} titleRepository
     */
    constructor(titleRepository) {
        this.titleRepository = titleRepository;
    }

    /**
     * @param { number } limit
     * @param { number } offset
     * @returns { Array<Title> } array of titles
     */
    async getPaginated(limit, offset) {
        return this.titleRepository.getPaginated(limit, offset);
    }

    /**
     * @param { number } id
     * @returns { Title } title with corresponding id
     */
    async getById(id) {
        return this.titleRepository.getById(id);
    }
}
