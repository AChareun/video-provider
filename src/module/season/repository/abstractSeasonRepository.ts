import { Season } from '../entity/season';
import { Episode } from '../../episode/entity/episode';
import { AbstractRepository } from '../../abstractRepository';

export abstract class AbstractSeasonRepository extends AbstractRepository<Season>{
    abstract getPaginated(limit: number, offset: number): Promise<Season[]>;

    // abstract searchBy(): Promise<Array<Title>> TODO

    abstract getById(id: number[]): Promise<Season[]>;
    abstract getById(id: number): Promise<Season>;

    abstract getSeasonEpisodes(id: number): Promise<Episode[]>
}
