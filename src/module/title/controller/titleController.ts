import { Application, query, Request, Response } from 'express';

import { ApiResponseHelper, IApiResponse } from '../../../lib/apiResponse';
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
        app.get(`${BASE_ROUTE}/:titleId/season`, this.getTitleSeasons.bind(this));
    }

    async getTitles(req: Request, res: Response): Promise<void> {
        if (req.query.limit && req.query.offset) {
            return this.getPaginated(req, res);
        }

        let apiResponse: IApiResponse;
        if (req.query.titleIds) {
            const queryParam = String(req.query.titleIds);
            const titleIds = queryParam.split(',').map((id) => parseInt(id));

            try {
                const titles = await this.titleService.getById(titleIds);
                apiResponse = this.responseHelper.buildOkResponse(titles);
            } catch (error) {
                apiResponse = this.responseHelper.buildErrorResponse(error.name);
                res.status(400).json(apiResponse);
                return
            }
        } else {
            apiResponse = this.responseHelper.buildErrorResponse('WRONG_QUERY_PARAM');
            res.status(400).json(apiResponse);
            return
        }

        res.status(200).json(apiResponse);
    }

    async getPaginated(req: Request, res: Response): Promise<void> {
        const { limit, offset } = req.query;

        let apiResponse: IApiResponse;
        if (typeof limit === 'string' && typeof offset === 'string') {
            try {
                const [limitInt, offsetInt] = [parseInt(limit), parseInt(offset)];
                const titles = await this.titleService.getPaginated(limitInt, offsetInt);
                apiResponse = this.responseHelper.buildOkResponse(titles);
            } catch (error) {
                apiResponse = this.responseHelper.buildErrorResponse(error.name);
                res.status(400).json(apiResponse);
                return
            }
        } else {
            apiResponse = this.responseHelper.buildErrorResponse('WRONG_QUERY_PARAM');
            res.status(400).json(apiResponse);
            return
        }

        res.status(200).json(apiResponse);
    }

    async getById(req: Request, res: Response): Promise<void> {
        let apiResponse: IApiResponse;
        const { titleId: id } = req.params;
        if (id || id === '0') {
            try {
                const title = await this.titleService.getById(parseInt(id));
                apiResponse = this.responseHelper.buildOkResponse([title]);
            } catch (error) {
                apiResponse = this.responseHelper.buildErrorResponse(error.name);
                res.status(400).json(apiResponse);
                return
            }
        } else {
            apiResponse = this.responseHelper.buildErrorResponse('WRONG_QUERY_PARAM');
            res.status(400).json(apiResponse);
            return
        }

        res.status(200).json(apiResponse);
    }

    async postTitle(req: Request, res: Response): Promise<void> {
        const titleData = req.body;
        let apiResponse: IApiResponse;

        try {
            await this.titleService.addTitle(titleData);
            apiResponse = this.responseHelper.buildOkResponse();
        } catch (error) {
            console.log(error);
            apiResponse = this.responseHelper.buildErrorResponse(error.name);
            res.status(400).json(apiResponse);
        }

        res.status(200).json(apiResponse);
    }

    async getTitleSeasons(req: Request, res: Response): Promise<void> {
        let apiResponse: IApiResponse;
        const { titleId: id } = req.params;
        if (id || id === '0') {
            try {
                const titleSeasons = await this.titleService.getTitleSeasons(parseInt(id));
                apiResponse = this.responseHelper.buildOkResponse([titleSeasons]);
            } catch (error) {
                apiResponse = this.responseHelper.buildErrorResponse(error.name);
                res.status(400).json(apiResponse);
                return
            }
        } else {
            apiResponse = this.responseHelper.buildErrorResponse('WRONG_QUERY_PARAM');
            res.status(400).json(apiResponse);
            return
        }

        res.status(200).json(apiResponse);
    }
}
