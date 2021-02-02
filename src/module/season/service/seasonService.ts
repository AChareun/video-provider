import { Season } from '../entity/season';
import { AbstractSeasonRepository } from '../repository/abstractSeasonRepository';
import { SeasonCreationAttributes } from '../model/seasonModel';

export class SeasonService {

    seasonRepository: AbstractSeasonRepository;

    constructor(seasonRepository: AbstractSeasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    async getPaginated(limit: number, offset: number): Promise<Season[]> {
        return this.seasonRepository.getPaginated(limit, offset);
    }

    async getById(ids: number[]): Promise<Season[]>
    async getById(id: number): Promise<Season>
    async getById(id: any): Promise<any> {
        return this.seasonRepository.getById(id);
    }

    async addSeason(data: SeasonCreationAttributes): Promise<Season> {
        return this.seasonRepository.addSeason(data);
    }
}
