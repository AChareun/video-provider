import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TitleAttributes {
    id: number;
    name: string;
    synopsis: string | undefined;
    episodeCount: number | undefined;
    seasonCount: number | undefined;
    sourceImage: string | undefined;
    premiereDate: Date | undefined;
    trailerUrl: string | undefined;
}

interface TitleCreationAttributes extends Optional<TitleAttributes, 'id'> {}

export class TitleModel
    extends Model<TitleAttributes, TitleCreationAttributes>
    implements TitleAttributes {
    id!: number;
    name!: string;
    synopsis!: string | undefined;
    episodeCount!: number | undefined;
    seasonCount!: number | undefined;
    sourceImage!: string | undefined;
    premiereDate!: Date | undefined;
    trailerUrl!: string | undefined;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    readonly deletedAt!: Date;

    static setup(sequelizeInstance: Sequelize) {
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

        return TitleModel;
    }
}
