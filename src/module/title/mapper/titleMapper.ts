import { Title } from '../entity/title';
import { TitleCreationAttributes, TitleModel } from '../model/titleModel';

export const fromModelToEntity = (titleModel: TitleModel): Title => {
    // @ts-expect-error
    return new Title(titleModel.toJSON());
};

export const fromEntityToModel = (title: Title): TitleCreationAttributes => {
    const {
        TitleId,
        Trailer,
        PremiereDate,
        SourceImage,
        SeasonCount,
        EpisodeCount,
        TitleSynopsis,
        TitleName,
    } = title;

    return {
        episodeCount: EpisodeCount,
        id: TitleId,
        name: TitleName,
        premiereDate: PremiereDate,
        seasonCount: SeasonCount,
        sourceImage: SourceImage,
        synopsis: TitleSynopsis,
        trailerUrl: Trailer,
    };
};
