import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { SeasonModel } from '../../season/model/seasonModel';

export interface EpisodeAttributes {
    id: number;
    seasonId: number;
    episodeNumber: number;
    name: string | undefined;
    description: string | undefined;
    sourcePath: string | undefined;
    length: number | undefined;
    introStartTime: number | undefined;
    introEndTime: number | undefined;
    outroStartTime: number | undefined;
    outroEndTime: number | undefined;
}

export interface EpisodeCreationAttributes extends Optional<EpisodeAttributes, 'id'> {}

export class EpisodeModel
    extends Model<EpisodeAttributes, EpisodeCreationAttributes>
    implements EpisodeAttributes {
    id!: number;
    seasonId!: number;
    episodeNumber!: number;
    name!: string | undefined;
    description!: string | undefined;
    sourcePath!: string | undefined;
    length!: number | undefined;
    introStartTime!: number | undefined;
    introEndTime!: number | undefined;
    outroStartTime!: number | undefined;
    outroEndTime!: number | undefined;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    readonly deletedAt!: Date;

    static setup(sequelizeInstance: Sequelize) {
        EpisodeModel.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                seasonId: {
                    type: DataTypes.BIGINT,
                    references: {
                        model: 'Seasons',
                        key: 'id',
                    },
                    allowNull: false,
                },
                episodeNumber: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING,
                },
                description: {
                    type: DataTypes.STRING,
                },
                sourcePath: {
                    type: DataTypes.STRING,
                },
                length: {
                    type: DataTypes.BIGINT,
                },
                introStartTime: {
                    type: DataTypes.BIGINT,
                },
                introEndTime: {
                    type: DataTypes.BIGINT,
                },
                outroStartTime: {
                    type: DataTypes.BIGINT,
                },
                outroEndTime: {
                    type: DataTypes.BIGINT,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'Episode',
                timestamps: true,
                paranoid: true,
            }
        );

        return EpisodeModel;
    }

    static setupAssociations(seasonModel: typeof SeasonModel) {
        EpisodeModel.belongsTo(seasonModel, { foreignKey: 'seasonId' });
        seasonModel.hasMany(EpisodeModel, { foreignKey: 'seasonId' });
    }
}
