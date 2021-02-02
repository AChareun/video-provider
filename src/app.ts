import * as express from 'express';

import { configureDI } from './config/di';
import { titleModuleInit } from './module/title/module';
import { seasonModuleInit } from './module/season/module';

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

const diContainer = configureDI();
titleModuleInit(app, diContainer);
seasonModuleInit(app, diContainer);
