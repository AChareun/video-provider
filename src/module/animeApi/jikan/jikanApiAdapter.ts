import { AbstractApiAdapter } from '../abstractApiAdapter';
import { get } from '../../../lib/httpReqAdapter';

export class JikanApiAdapter extends AbstractApiAdapter {
    private BASE_URL = 'https://api.jikan.moe/v3/';


    async searchForTitle(query: string): Promise<any> {
        const url = encodeURIComponent(`${this.BASE_URL}search/anime?q=${query}&page=1`);
        // @ts-ignore
        const { results } = await get(url);

        return results;
    }

    async getTitleInfo(titleId: number): Promise<any> {
        const url = encodeURIComponent(`${this.BASE_URL}anime/${titleId}`);

        return get(url);
    }

    async getTitleEpisodes(titleId: number, page?: number): Promise<any> {
        const url = encodeURIComponent(`${this.BASE_URL}anime/${titleId}/episodes`);

        return get(url);
    }
}