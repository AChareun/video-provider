import { Title } from '../entity/title';
import { Season } from '../../season/entity/season';
import { AbstractRepository } from '../../abstractRepository';

export abstract class AbstractTitleRepository extends AbstractRepository<Title> {
    abstract getPaginated(limit: number, offset: number): Promise<Array<Title>>

    // abstract searchBy(): Promise<Array<Title>> TODO

    abstract getById(id: number[]): Promise<Title[]>;
    abstract getById(id: number): Promise<Title>;

    abstract getTitleSeasons(id: number): Promise<Season[]>
}
