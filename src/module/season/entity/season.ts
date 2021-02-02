export class Season {
    SeasonId: number | undefined;
    TitleId: number;
    SeasonNumber: number;
    SeasonName: string | undefined;
    SeasonSynopsis: string | undefined;
    EpisodeCount: number | undefined;
    SourceImage: string | undefined;
    PremiereDate: Date | undefined;
    Trailer: string | undefined;

    constructor({
        id,
        titleId,
        number,
        name,
        synopsis,
        episodeCount,
        sourceImage,
        premiereDate,
        trailerUrl,
    }: {
        id: number | undefined;
        titleId: number,
        number: number;
        name: string;
        synopsis: string | undefined;
        episodeCount: number | undefined;
        sourceImage: string | undefined;
        premiereDate: Date | undefined;
        trailerUrl: string | undefined;
    }) {
        this.SeasonId = id;
        this.TitleId = titleId;
        this.SeasonNumber = number;
        this.SeasonName = name;
        this.SeasonSynopsis = synopsis;
        this.EpisodeCount = episodeCount;
        this.SourceImage = sourceImage;
        this.PremiereDate = premiereDate;
        this.Trailer = trailerUrl;
    }
}
