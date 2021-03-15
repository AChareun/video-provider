import { AbstractApiAdapter } from '../animeApi/abstractApiAdapter';
import { AbstractRepository } from '../abstractRepository';
import { ResourceNotFoundError } from '../error/resourceNotFoundError';

export class CacheManager<T> {
    private readonly apiAdapter: AbstractApiAdapter;
    private readonly repository: AbstractRepository<T>;

    constructor(apiAdapter: AbstractApiAdapter, repository: AbstractRepository<T>) {
        this.apiAdapter = apiAdapter;
        this.repository = repository;
    }

    private async checkRepository(id: number): Promise<T> {
        return await this.repository.getByExternalId(id);
    }

    private async getFromExternalApi(resourceId: number): Promise<any> {
        return await this.apiAdapter.getResourceInfo(resourceId);
    }

    private async storeNewResource(data: any): Promise<T | void> {
        return await this.repository.addRegistry(data);
    }

    async getResource(id: number): Promise<any> {
        try {
            return await this.checkRepository(id);
        } catch (e) {
            if (e instanceof ResourceNotFoundError) {
                const resourceFromApi = await this.getFromExternalApi(id);

                return await this.storeNewResource(resourceFromApi);
            }

            console.log(e)
        }
    }
}
