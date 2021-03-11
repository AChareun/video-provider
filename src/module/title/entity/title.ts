export class Title {
    TitleId: number | null;
    ExternalId: number | null;
    TitleName: string;
    TitleSynopsis: string | null;
    EpisodeCount: number | null;
    SeasonCount: number | null;
    SourceImage: string | null;
    PremiereDate: Date | null;
    Trailer: string | null;

    constructor({
        id,
        externalId,
        name,
        synopsis,
        episodeCount,
        seasonCount,
        sourceImage,
        premiereDate,
        trailerUrl,
    }: {
        id: number | undefined;
        externalId: number | undefined;
        name: string;
        synopsis: string | undefined;
        episodeCount: number | undefined;
        seasonCount: number | undefined;
        sourceImage: string | undefined;
        premiereDate: Date | undefined;
        trailerUrl: string | undefined;
    }) {
        this.TitleId = id || null;
        this.ExternalId = externalId || null;
        this.TitleName = name;
        this.TitleSynopsis = synopsis || null;
        this.EpisodeCount = episodeCount || null;
        this.SeasonCount = seasonCount || null;
        this.SourceImage = sourceImage || null;
        this.PremiereDate = premiereDate || null;
        this.Trailer = trailerUrl || null;
    }
}
