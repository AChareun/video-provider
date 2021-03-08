export abstract class AbstractRepository<T> {

    abstract getById(id: number[]): Promise<T[]>;
    abstract getById(id: number): Promise<T>;

    abstract addRegistry(data: T): Promise<T>;
}