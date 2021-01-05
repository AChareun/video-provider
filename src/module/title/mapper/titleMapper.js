/**
 * @typedef { import('../model/titleModel') } TitleModel
 */

const Title = require('../entity/title');

/**
 * @param { TitleModel } titleModel
 * @returns { Title }
 */
const fromModelToEntity = (titleModel) => new Title(...titleModel.toJSON());

module.exports = {
    fromModelToEntity,
};
