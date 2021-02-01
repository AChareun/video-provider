import { Application, query, Request, Response } from 'express';

import { ApiResponseHelper } from '../../../lib/apiResponse';
import { AbstractController } from '../../abstractController';
import { TitleService } from '../module';

export class TitleController extends AbstractController {
    BASE_ROUTE: string = '/title';
    titleService: TitleService;
    responseHelper: ApiResponseHelper;

    constructor(titleService: TitleService, responseHelper: ApiResponseHelper) {
        super();
        this.titleService = titleService;
        this.responseHelper = responseHelper;
    }

    configureRoutes(app: Application): void {
        const { BASE_ROUTE } = this;
        app.get(`${BASE_ROUTE}`, this.getTitles.bind(this));
        app.post(`${BASE_ROUTE}`, this.postTitle.bind(this));
        app.get(`${BASE_ROUTE}/:titleId`, this.getById.bind(this));
    }

    async getTitles(req: Request, res: Response): Promise<void> {
        if (req.query.limit && req.query.offset) {
            return this.getPaginated(req, res);
        }

        if (req.query.titleIds) {
            const queryParam = String(req.query.titleIds);
            const titleIds = queryParam.split(',').map((id) => parseInt(id));

            const titles = await this.titleService.getById(titleIds);
            const apiResponse = this.responseHelper.buildOkResponse(titles);

            res.json(apiResponse);

            return
        }

        const apiResponse = this.responseHelper.buildErrorResponse("WRONG_QUERY_PARAM");
        res.json(apiResponse);
    }

    async getPaginated(req: Request, res: Response): Promise<void> {
        const { limit, offset } = req.query;
        let titles: any;

        if (typeof limit === 'string' && typeof offset === 'string') {
            const limitInt = parseInt(limit);
            const offsetInt = parseInt(offset);
            titles = await this.titleService.getPaginated(limitInt, offsetInt);
        }

        const apiResponse = this.responseHelper.buildOkResponse(titles);

        res.json(apiResponse);
    }

    async getById(req: Request, res: Response): Promise<void> {
        let title: any;
        const { titleId: id } = req.params;

        if (typeof id === 'string') {
            const idInt = parseInt(id);
            title = await this.titleService.getById(idInt);
        }

        const apiResponse = this.responseHelper.buildOkResponse(title);

        res.json(apiResponse);
    }

    async postTitle(req: Request, res: Response): Promise<void> {
        const titleData = req.body;

        try {
            await this.titleService.addTitle(titleData);
        } catch (error) {
            console.log(error);
        }

        const apiResponse = this.responseHelper.buildOkResponse()

        res.json(apiResponse);
    }
}
