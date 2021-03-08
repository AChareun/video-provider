import { Episode } from '../entity/episode';
import { AbstractEpisodeRepository } from '../repository/abstractEpisodeRepository';
import { EpisodeCreationAttributes } from '../model/episodeModel';

export class EpisodeService {
    episodeRepository: AbstractEpisodeRepository;

    constructor(episodeRepository: AbstractEpisodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    async getPaginated(limit: number, offset: number): Promise<Episode[]> {
        return this.episodeRepository.getPaginated(limit, offset);
    }

    async getById(ids: number[]): Promise<Episode[]>;
    async getById(id: number): Promise<Episode>;
    async getById(id: any): Promise<any> {
        return this.episodeRepository.getById(id);
    }

    async addEpisode(data: Episode): Promise<Episode> {
        return this.episodeRepository.addRegistry(data);
    }

    async getByNumber(
        titleId: number,
        seasonNumber: number,
        episodeNumber: number
    ): Promise<Episode> {
        return this.episodeRepository.getByNumber(titleId, seasonNumber, episodeNumber);
    }
}
