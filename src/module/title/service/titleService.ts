import { Title } from '../entity/title';
import { AbstractTitleRepository } from '../repository/abstractTitleRepository';
import { Season } from '../../season/entity/season';
import { AbstractApiAdapter } from '../../animeApi/abstractApiAdapter';

export class TitleService {

    titleRepository: AbstractTitleRepository;
    apiAdapter: AbstractApiAdapter;

    constructor(titleRepository: AbstractTitleRepository, apiAdapter: AbstractApiAdapter) {
        this.titleRepository = titleRepository;
        this.apiAdapter = apiAdapter;
    }

    async getPaginated(limit: number, offset: number): Promise<Array<Title>> {
        return this.titleRepository.getPaginated(limit, offset);
    }

    async getById(ids: number[]): Promise<Title[]>
    async getById(id: number): Promise<Title>
    async getById(id: any): Promise<any> {
        return this.titleRepository.getById(id);
    }

    async addTitle(data: Title): Promise<Title> {
        return this.titleRepository.addRegistry(data);
    }

    async getTitleSeasons(id: number): Promise<Season[]> {
        return this.titleRepository.getTitleSeasons(id);
    }

    async searchTitles(query: string): Promise<any> {
        return this.apiAdapter.searchForTitle(query);
    }
}
