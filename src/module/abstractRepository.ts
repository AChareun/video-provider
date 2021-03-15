export abstract class AbstractRepository<T> {

    abstract getByExternalId(id: number): Promise<T>;

    abstract addRegistry(data: T): Promise<T>;
}