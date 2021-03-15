import { AbstractApiAdapter } from '../abstractApiAdapter';
import { get } from '../../../lib/httpReqAdapter';
import { fromApiResponseToEntity } from './mapper';

export class JikanApiAdapter extends AbstractApiAdapter {
    private BASE_URL = 'https://api.jikan.moe/v3/';


    async searchForResource(query: string): Promise<any> {
        const url = encodeURI(`${this.BASE_URL}search/anime?q=${query}&page=1`);
        const response = await get(url);
        const { results } = response?.data;

        return results.map(fromApiResponseToEntity);
    }

    async getResourceInfo(titleId: number): Promise<any> {
        const url = encodeURI(`${this.BASE_URL}anime/${titleId}`);
        const response = await get(url);
        const data = response?.data;

        return fromApiResponseToEntity(data);
    }
}