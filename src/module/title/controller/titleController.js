/**
 * @typedef { import('../service/titleService') } TitleService
 * @typedef { import('express').Application } ExpressApp
 * @typedef { import('express').Request } Request
 * @typedef { import('express').Response } Response
 */

const AbstractController = require('../../abstractController');

module.exports = class TitleController extends AbstractController {
    /**
     * @param { TitleService } titleService
     */
    constructor(titleService) {
        super();
        this.BASE_ROUTE = '/title';
        this.titleService = titleService;
    }

    /**
     * @param { ExpressApp } app
     */
    configureRoutes(app) {
        const { BASE_ROUTE } = this;
        app.get(`${BASE_ROUTE}`, this.getPaginated.bind(this));
        app.get(`${BASE_ROUTE}/:titleId`, this.getById.bind(this));
    }

    /**
     * @param { Request } req
     * @param { Response } res
     */
    async getPaginated(req, res) {
        const { limit, offset } = req.query;
        const titles = await this.titleService.getPaginated(limit, offset);

        res.send(titles);
    }

    /**
     * @param { Request } req
     * @param { Response } res
     */
    async getById(req, res) {
        const { titleId: id } = req.params;
        const title = await this.titleService.getById(id);

        res.send(title);
    }
};
