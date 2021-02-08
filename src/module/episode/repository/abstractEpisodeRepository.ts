import { Episode } from '../entity/episode';

export abstract class AbstractEpisodeRepository {
    abstract getPaginated(limit: number, offset: number): Promise<Episode[]>;

    // abstract searchBy(): Promise<Episode[]> TODO

    abstract getById(id: number[]): Promise<Episode[]>;
    abstract getById(id: number): Promise<Episode>;

    abstract addEpisode(data: Episode): Promise<Episode>;

    abstract getByNumber(
        titleId: number,
        seasonNumber: number,
        episodeNumber: number
    ): Promise<Episode>;
}
