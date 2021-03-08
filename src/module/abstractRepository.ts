export abstract class AbstractRepository<T> {

    abstract getByName(name: string): Promise<T>;

    abstract addRegistry(data: T): Promise<T>;
}