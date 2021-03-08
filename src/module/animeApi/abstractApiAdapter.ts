export abstract class AbstractApiAdapter {
    abstract searchForTitle(query: string): Promise<any>

    abstract getTitleInfo(titleId: number): Promise<any>

    abstract getTitleEpisodes(titleId: number, page?: number): Promise<any>
}