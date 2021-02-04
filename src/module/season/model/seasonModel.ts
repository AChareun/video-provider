import {
    Model,
    DataTypes,
    Sequelize,
    Optional,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin
} from 'sequelize';
import { TitleModel } from '../../title/model/titleModel';
import { EpisodeModel } from '../../episode/model/episodeModel';

export interface SeasonAttributes {
    id: number;
    titleId: number;
    seasonNumber: number;
    name: string | undefined;
    synopsis: string | undefined;
    episodeCount: number | undefined;
    sourceImage: string | undefined;
    premiereDate: Date | undefined;
    trailerUrl: string | undefined;
}

export interface SeasonCreationAttributes extends Optional<SeasonAttributes, 'id'> {}

export class SeasonModel
    extends Model<SeasonAttributes, SeasonCreationAttributes>
    implements SeasonAttributes {
    id!: number;
    titleId: number;
    seasonNumber!: number;
    name!: string | undefined;
    synopsis!: string | undefined;
    episodeCount!: number | undefined;
    sourceImage!: string | undefined;
    premiereDate!: Date | undefined;
    trailerUrl!: string | undefined;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    readonly deletedAt!: Date;

    getEpisodes!: HasManyGetAssociationsMixin<EpisodeModel>;
    addEpisode!: HasManyAddAssociationMixin<EpisodeModel, number>;
    hasEpisode!: HasManyHasAssociationMixin<EpisodeModel, number>;
    countEpisodes!: HasManyCountAssociationsMixin;
    createEpisode!: HasManyCreateAssociationMixin<EpisodeModel>;

    static setup(sequelizeInstance: Sequelize) {
        SeasonModel.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                titleId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'Titles',
                        key: 'id',
                    },
                },
                seasonNumber: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
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
                modelName: 'Season',
                timestamps: true,
                paranoid: true,
            }
        );

        return SeasonModel;
    }

    static setupAssociations(titleModel: typeof TitleModel) {
        SeasonModel.belongsTo(titleModel, { foreignKey: 'titleId' });
        titleModel.hasMany(SeasonModel, { foreignKey: 'titleId' });
    }
}
