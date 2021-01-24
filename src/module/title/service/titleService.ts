import { Title } from '../entity/title';
import { AbstractTitleRepository } from '../repository/abstractTitleRepository';

export class TitleService {

    titleRepository: AbstractTitleRepository;

    constructor(titleRepository: AbstractTitleRepository) {
        this.titleRepository = titleRepository;
    }

    async getPaginated(limit: number, offset: number): Promise<Array<Title>> {
        return this.titleRepository.getPaginated(limit, offset);
    }

    async getById(id: number): Promise<Title> {
        return this.titleRepository.getById(id);
    }

    async addTitle(data: Title): Promise<Title> {
        return this.titleRepository.addTitle(data);
    }
}
