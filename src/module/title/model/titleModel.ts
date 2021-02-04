import {
    Model,
    DataTypes,
    Sequelize,
    Optional,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin
} from 'sequelize';
import { SeasonModel } from '../../season/model/seasonModel';

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

export interface TitleCreationAttributes extends Optional<TitleAttributes, 'id'> {}

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

    getSeasons!: HasManyGetAssociationsMixin<SeasonModel>;
    addSeason!: HasManyAddAssociationMixin<SeasonModel, number>;
    hasSeason!: HasManyHasAssociationMixin<SeasonModel, number>;
    countSeasons!: HasManyCountAssociationsMixin;
    createSeason!: HasManyCreateAssociationMixin<SeasonModel>;

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
                    type: DataTypes.STRING,
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
