import { AbstractApiAdapter } from '../abstractApiAdapter';
import { get } from '../../../lib/httpReqAdapter';
import { fromApiResponseToEntity } from './mapper';

export class JikanApiAdapter extends AbstractApiAdapter {
    private BASE_URL = 'https://api.jikan.moe/v3/';


    async searchForTitle(query: string): Promise<any> {
        const url = encodeURI(`${this.BASE_URL}search/anime?q=${query}&page=1`);
        const response = await get(url);
        const { results } = response?.data;

        return results.map(fromApiResponseToEntity);
    }

    async getTitleInfo(titleId: number): Promise<any> {
        const url = encodeURI(`${this.BASE_URL}anime/${titleId}`);

        return get(url);
    }

    async getTitleEpisodes(titleId: number, page?: number): Promise<any> {
        const url = encodeURI(`${this.BASE_URL}anime/${titleId}/episodes`);

        return get(url);
    }
}