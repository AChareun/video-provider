import { EpisodeCreationAttributes } from '../model/episodeModel';

export class Episode {
    EpisodeId: number | undefined;
    SeasonId: number;
    EpisodeNumber: number;
    EpisodeName: string | undefined;
    EpisodeDescription: string | undefined;
    SourcePath: string | undefined;
    Length: number | undefined;
    IntroStartTime: number | undefined;
    IntroEndTime: number | undefined;
    OutroStartTime: number | undefined;
    OutroEndTime: number | undefined;

    constructor({
        id,
        seasonId,
        episodeNumber,
        name,
        description,
        sourcePath,
        length,
        introStartTime,
        introEndTime,
        outroStartTime,
        outroEndTime,
    }: EpisodeCreationAttributes) {
        this.EpisodeId = id;
        this.SeasonId = seasonId;
        this.EpisodeNumber = episodeNumber;
        this.EpisodeName = name;
        this.EpisodeDescription = description;
        this.SourcePath = sourcePath;
        this.Length = length;
        this.IntroStartTime = introStartTime;
        this.IntroEndTime = introEndTime;
        this.OutroStartTime = outroStartTime;
        this.OutroEndTime = outroEndTime;
    }
}
