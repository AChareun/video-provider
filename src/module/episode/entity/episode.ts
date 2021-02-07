import { EpisodeCreationAttributes } from '../model/episodeModel';

export class Episode {
    Id: number | undefined;
    SeasonId: number;
    Number: number;
    Name: string | undefined;
    Description: string | undefined;
    Source: string | undefined;
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
        this.Id = id;
        this.SeasonId = seasonId;
        this.Number = episodeNumber;
        this.Name = name;
        this.Description = description;
        this.Source = sourcePath;
        this.Length = length;
        this.IntroStartTime = introStartTime;
        this.IntroEndTime = introEndTime;
        this.OutroStartTime = outroStartTime;
        this.OutroEndTime = outroEndTime;
    }
}
