import { Episode } from '../entity/episode';
import { EpisodeCreationAttributes, EpisodeModel } from '../model/episodeModel';

export const fromModelToEntity = (episodeModel: EpisodeModel): Episode => {
    // @ts-expect-error
    return new Episode(episodeModel.toJSON());
}

export const fromEntityToModel = (episode: Episode): EpisodeCreationAttributes => {
    const {
        SeasonId,
        EpisodeId,
        EpisodeDescription,
        EpisodeName,
        EpisodeNumber,
        IntroEndTime,
        IntroStartTime,
        Length,
        OutroEndTime,
        OutroStartTime,
        SourcePath,
    } = episode;

    return {
        description: EpisodeDescription,
        episodeNumber: EpisodeNumber,
        id: EpisodeId,
        introEndTime: IntroEndTime,
        introStartTime: IntroStartTime,
        length: Length,
        name: EpisodeName,
        outroEndTime: OutroEndTime,
        outroStartTime: OutroStartTime,
        seasonId: SeasonId,
        sourcePath: SourcePath,
    };
};
