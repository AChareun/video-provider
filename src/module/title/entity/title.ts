export class Title {
    TitleId: number | undefined;
    TitleName: string;
    TitleSynopsis: string | undefined;
    EpisodeCount: number | undefined;
    SeasonCount: number | undefined;
    SourceImage: string | undefined;
    PremiereDate: Date | undefined;
    Trailer: string | undefined;

    constructor({
        id,
        name,
        synopsis,
        episodeCount,
        seasonCount,
        sourceImage,
        premiereDate,
        trailerUrl,
    }: {
        id: number | undefined;
        name: string;
        synopsis: string | undefined;
        episodeCount: number | undefined;
        seasonCount: number | undefined;
        sourceImage: string | undefined;
        premiereDate: Date | undefined;
        trailerUrl: string | undefined;
    }) {
        this.TitleId = id;
        this.TitleName = name;
        this.TitleSynopsis = synopsis;
        this.EpisodeCount = episodeCount;
        this.SeasonCount = seasonCount;
        this.SourceImage = sourceImage;
        this.PremiereDate = premiereDate;
        this.Trailer = trailerUrl;
    }
}
