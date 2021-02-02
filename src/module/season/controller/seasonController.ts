import { Application, query, Request, Response } from 'express';

import { ApiResponseHelper, IApiResponse } from '../../../lib/apiResponse';
import { AbstractController } from '../../abstractController';
import { SeasonService } from '../service/seasonService';

export class SeasonController extends AbstractController {
    BASE_ROUTE: string = '/season';
    seasonService: SeasonService;
    responseHelper: ApiResponseHelper;

    constructor(seasonService: SeasonService, responseHelper: ApiResponseHelper) {
        super();
        this.seasonService = seasonService;
        this.responseHelper = responseHelper;
    }

    configureRoutes(app: Application): void {
        const { BASE_ROUTE } = this;
        app.get(`${BASE_ROUTE}`, this.getSeasons.bind(this));
        app.post(`${BASE_ROUTE}`, this.postSeason.bind(this));
        app.get(`${BASE_ROUTE}/:seasonId`, this.getById.bind(this));
    }

    async getSeasons(req: Request, res: Response): Promise<void> {
        if (req.query.limit && req.query.offset) {
            return this.getPaginated(req, res);
        }

        let apiResponse: IApiResponse;
        if (req.query.seasonIds) {
            const queryParam = String(req.query.seasonIds);
            const seasonIds = queryParam.split(',').map((id) => parseInt(id));

            try {
                const seasons = await this.seasonService.getById(seasonIds);
                apiResponse = this.responseHelper.buildOkResponse(seasons);
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
                const seasons = await this.seasonService.getPaginated(limitInt, offsetInt);
                apiResponse = this.responseHelper.buildOkResponse(seasons);
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
        const { seasonId: id } = req.params;
        if (id || id === '0') {
            try {
                const season = await this.seasonService.getById(parseInt(id));
                apiResponse = this.responseHelper.buildOkResponse([season]);
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

    async postSeason(req: Request, res: Response): Promise<void> {
        const seasonData = req.body;
        let apiResponse: IApiResponse;

        try {
            await this.seasonService.addSeason(seasonData);
            apiResponse = this.responseHelper.buildOkResponse();
        } catch (error) {
            console.log(error);
            apiResponse = this.responseHelper.buildErrorResponse(error.name);
            res.status(400).json(apiResponse);
        }

        res.status(200).json(apiResponse);
    }
}
