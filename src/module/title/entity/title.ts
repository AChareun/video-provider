export class Title {
    id: number;
    name: string;
    synopsis: string;
    episodeCount: number;
    seasonCount: number;
    sourceImage: string;
    premiereDate: Date;
    trailerUrl: string;

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
        synopsis: string;
        episodeCount: number;
        seasonCount: number;
        sourceImage: string;
        premiereDate: Date;
        trailerUrl: string;
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
