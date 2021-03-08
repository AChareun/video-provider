import { Episode } from '../entity/episode';
import { AbstractRepository } from '../../abstractRepository';

export abstract class AbstractEpisodeRepository extends AbstractRepository<Episode> {
    abstract getPaginated(limit: number, offset: number): Promise<Episode[]>;

    // abstract searchBy(): Promise<Episode[]> TODO

    abstract getById(id: number[]): Promise<Episode[]>;
    abstract getById(id: number): Promise<Episode>;

    abstract getByNumber(
        titleId: number,
        seasonNumber: number,
        episodeNumber: number
    ): Promise<Episode>;
}
