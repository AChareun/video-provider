export class Title {
    id: number | undefined;
    name: string;
    synopsis: string | undefined;
    episodeCount: number | undefined;
    seasonCount: number | undefined;
    sourceImage: string | undefined;
    premiereDate: Date | undefined;
    trailerUrl: string | undefined;

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
        this.id = id;
        this.name = name;
        this.synopsis = synopsis;
        this.episodeCount = episodeCount;
        this.seasonCount = seasonCount;
        this.sourceImage = sourceImage;
        this.premiereDate = premiereDate;
        this.trailerUrl = trailerUrl;
    }
}
