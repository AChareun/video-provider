import { Season } from '../entity/season';
import { SeasonCreationAttributes, SeasonModel } from '../model/seasonModel';

export const fromModelToEntity = (seasonModel: SeasonModel): Season => {
    // @ts-expect-error
    return new Season(seasonModel.toJSON());
};

export const fromEntityToModel = (season: Season): SeasonCreationAttributes => {
    const {
        TitleId,
        SeasonNumber,
        SeasonSynopsis,
        SeasonName,
        SeasonId,
        EpisodeCount,
        PremiereDate,
        SourceImage,
        Trailer,
    } = season;

    return {
        episodeCount: EpisodeCount,
        id: SeasonId,
        name: SeasonName,
        premiereDate: PremiereDate,
        seasonNumber: SeasonNumber,
        sourceImage: SourceImage,
        synopsis: SeasonSynopsis,
        titleId: TitleId,
        trailerUrl: Trailer,
    };
};
