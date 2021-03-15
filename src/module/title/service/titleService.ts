import { Title } from '../entity/title';
import { AbstractTitleRepository } from '../repository/abstractTitleRepository';
import { Season } from '../../season/entity/season';
import { AbstractApiAdapter } from '../../animeApi/abstractApiAdapter';
import { CacheManager } from '../../cache/cacheManager';

export class TitleService {

    titleRepository: AbstractTitleRepository;
    apiAdapter: AbstractApiAdapter;
    cacheManager: CacheManager<Title>

    constructor(titleRepository: AbstractTitleRepository, apiAdapter: AbstractApiAdapter, cacheManager: CacheManager<Title>) {
        this.titleRepository = titleRepository;
        this.apiAdapter = apiAdapter;
        this.cacheManager = cacheManager;
    }

    async getPaginated(limit: number, offset: number): Promise<Array<Title>> {
        return this.titleRepository.getPaginated(limit, offset);
    }

    async getById(ids: number[]): Promise<Title[]>
    async getById(id: number, isExternal?: boolean): Promise<Title>
    async getById(id: any, isExternal?: boolean): Promise<any> {
        if (isExternal && !(Array.isArray(id))) {
            return this.cacheManager.getResource(id);
        }

        return this.titleRepository.getById(id);
    }

    async addTitle(data: Title): Promise<Title> {
        return this.titleRepository.addRegistry(data);
    }

    async getTitleSeasons(id: number): Promise<Season[]> {
        return this.titleRepository.getTitleSeasons(id);
    }

    async searchTitles(query: string): Promise<any> {
        return this.apiAdapter.searchForResource(query);
    }
}
