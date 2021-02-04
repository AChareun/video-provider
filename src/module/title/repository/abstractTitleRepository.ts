import { Title } from '../entity/title';
import { Season } from '../../season/entity/season';

export abstract class AbstractTitleRepository {
    abstract getPaginated(limit: number, offset: number): Promise<Array<Title>>

    // abstract searchBy(): Promise<Array<Title>> TODO

    abstract getById(id: number[]): Promise<Title[]>
    abstract getById(id: number): Promise<Title>

    abstract addTitle(data: Title): Promise<Title>

    abstract getTitleSeasons(id: number): Promise<Season[]>
}
