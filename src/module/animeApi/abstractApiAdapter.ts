export abstract class AbstractApiAdapter {
    abstract searchForResource(query: string): Promise<any>

    abstract getResourceInfo(titleId: number): Promise<any>
}