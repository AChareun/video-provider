import { Episode } from '../entity/episode';
import { EpisodeCreationAttributes, EpisodeModel } from '../model/episodeModel';

export const fromModelToEntity = (episodeModel: EpisodeModel): Episode => {
    // @ts-expect-error
    return new Episode(episodeModel.toJSON());
}

export const fromEntityToModel = (episode: Episode): EpisodeCreationAttributes => {
    const {
        SeasonId,
        Id,
        Description,
        Name,
        Number,
        IntroEndTime,
        IntroStartTime,
        Length,
        OutroEndTime,
        OutroStartTime,
        Source,
    } = episode;

    return {
        description: Description,
        episodeNumber: Number,
        id: Id,
        introEndTime: IntroEndTime,
        introStartTime: IntroStartTime,
        length: Length,
        name: Name,
        outroEndTime: OutroEndTime,
        outroStartTime: OutroStartTime,
        seasonId: SeasonId,
        sourcePath: Source,
    };
};
