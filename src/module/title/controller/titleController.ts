import { Application, query, Request, Response } from 'express';

import { AbstractController } from '../../abstractController';
import { Title } from '../entity/title';
import { TitleService } from '../module';

export class TitleController extends AbstractController {
    BASE_ROUTE: string = '/title';
    titleService: TitleService;

    constructor(titleService: TitleService) {
        super();
        this.titleService = titleService;
    }

    configureRoutes(app: Application): void {
        const { BASE_ROUTE } = this;
        app.get(`${BASE_ROUTE}`, this.getPaginated.bind(this));
        app.post(`${BASE_ROUTE}`, this.postTitle.bind(this));
        app.get(`${BASE_ROUTE}/:titleId`, this.getById.bind(this));
    }

    async getPaginated(req: Request, res: Response): Promise<void> {
        const { limit, offset } = req.query;
        let titles: any;

        if (typeof limit === 'string' && typeof offset === 'string') {
            const limitInt = parseInt(limit);
            const offsetInt = parseInt(offset);
            titles = await this.titleService.getPaginated(limitInt, offsetInt);
        }

        res.send(titles);
    }

    async getById(req: Request, res: Response): Promise<void> {
        let title: any;
        const { titleId: id } = req.params;

        if (typeof id === 'string') {
            const idInt = parseInt(id);
            title = await this.titleService.getById(idInt);
        }

        res.send(title);
    }

    async postTitle(req: Request, res: Response): Promise<void> {
        const titleData = req.body;

        try {
            this.titleService.addTitle(titleData);
        } catch (error) {
            console.log(error);
        }

        res.send('OK!');
    }
}
