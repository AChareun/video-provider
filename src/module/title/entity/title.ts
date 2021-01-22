export class Title {
    id: number;
    name: string;
    synopsis: string | null;
    episodeCount: number | null;
    seasonCount: number | null;
    sourceImage: string | null;
    premiereDate: Date | null;
    trailerUrl: string | null;

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
        id: number;
        name: string;
        synopsis: string | null;
        episodeCount: number | null;
        seasonCount: number | null;
        sourceImage: string | null;
        premiereDate: Date | null;
        trailerUrl: string | null;
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
