/**
 * @typedef { import('sequelize').Sequelize } Sequelize
 */

const { Model, DataTypes } = require('sequelize');

module.exports = class TitleModel extends Model {
    /**
     * @param { Sequelize } sequelizeInstance
     * @returns { TitleModel }
     */
    static setup(sequelizeInstance) {
        TitleModel.init(
            {
                Id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                Name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                Synopsis: {
                    type: DataTypes.STRING,
                },
                EpisodeCount: {
                    type: DataTypes.INTEGER,
                },
                SeasonCount: {
                    type: DataTypes.INTEGER,
                },
                SourceImage: {
                    type: DataTypes.INTEGER,
                },
                PremiereDate: {
                    type: DataTypes.DATE,
                },
                TrailerUrl: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'Title',
                timestamps: true,
                paranoid: true,
            }
        );

        return TitleModel;
    }
};
