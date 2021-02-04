import { Episode } from '../entity/episode';

export abstract class AbstractEpisodeRepository {
    abstract getPaginated(limit: number, offset: number): Promise<Episode[]>;

    // abstract searchBy(): Promise<Array<Title>> TODO

    abstract getById(id: number[]): Promise<Episode[]>;
    abstract getById(id: number): Promise<Episode>;

    abstract addEpisode(data: Episode): Promise<Episode>;
}
