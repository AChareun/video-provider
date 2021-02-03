import { Application, Request, Response } from 'express';

import { ApiResponseHelper, IApiResponse } from '../../../lib/apiResponse';
import { AbstractController } from '../../abstractController';
import { EpisodeService } from '../service/episodeService';

export class EpisodeController extends AbstractController {
    BASE_ROUTE: string = '/episode';
    episodeService: EpisodeService;
    responseHelper: ApiResponseHelper;

    constructor(episodeService: EpisodeService, responseHelper: ApiResponseHelper) {
        super();
        this.episodeService = episodeService;
        this.responseHelper = responseHelper;
    }

    configureRoutes(app: Application): void {
        const { BASE_ROUTE } = this;
        app.get(`${BASE_ROUTE}`, this.getEpisodes.bind(this));
        app.post(`${BASE_ROUTE}`, this.postEpisode.bind(this));
        app.get(`${BASE_ROUTE}/:episodeId`, this.getById.bind(this));
    }

    async getEpisodes(req: Request, res: Response): Promise<void> {
        if (req.query.limit && req.query.offset) {
            return this.getPaginated(req, res);
        }

        let apiResponse: IApiResponse;
        if (req.query.episodeIds) {
            const queryParam = String(req.query.episodeIds);
            const episodeIds = queryParam.split(',').map((id) => parseInt(id));

            try {
                const episodes = await this.episodeService.getById(episodeIds);
                apiResponse = this.responseHelper.buildOkResponse(episodes);
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
                const episodes = await this.episodeService.getPaginated(limitInt, offsetInt);
                apiResponse = this.responseHelper.buildOkResponse(episodes);
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
        const { episodeId: id } = req.params;
        if (id || id === '0') {
            try {
                const episode = await this.episodeService.getById(parseInt(id));
                apiResponse = this.responseHelper.buildOkResponse([episode]);
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

    async postEpisode(req: Request, res: Response): Promise<void> {
        const episodeData = req.body;
        let apiResponse: IApiResponse;

        try {
            await this.episodeService.addEpisode(episodeData);
            apiResponse = this.responseHelper.buildOkResponse();
        } catch (error) {
            console.log(error);
            apiResponse = this.responseHelper.buildErrorResponse(error.name);
            res.status(400).json(apiResponse);
        }

        res.status(200).json(apiResponse);
    }
}
