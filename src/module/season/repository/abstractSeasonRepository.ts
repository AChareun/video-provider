import { Season } from '../entity/season';
import { Episode } from '../../episode/entity/episode';

export abstract class AbstractSeasonRepository {
    abstract getPaginated(limit: number, offset: number): Promise<Season[]>;

    // abstract searchBy(): Promise<Array<Title>> TODO

    abstract getById(id: number[]): Promise<Season[]>;
    abstract getById(id: number): Promise<Season>;

    abstract addSeason(data: Season): Promise<Season>;

    abstract getSeasonEpisodes(id: number): Promise<Episode[]>
}
