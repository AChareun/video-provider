import { Model, DataTypes, Sequelize } from 'sequelize';

export class TitleModel extends Model {
    static setup(sequelizeInstance: Sequelize): TitleModel {
        TitleModel.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                synopsis: {
                    type: DataTypes.STRING,
                },
                episodeCount: {
                    type: DataTypes.INTEGER,
                },
                seasonCount: {
                    type: DataTypes.INTEGER,
                },
                sourceImage: {
                    type: DataTypes.INTEGER,
                },
                premiereDate: {
                    type: DataTypes.DATE,
                },
                trailerUrl: {
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

        // @ts-ignore
        return TitleModel;
    }
};
