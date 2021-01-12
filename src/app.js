const express = require('express');

const configureDI = require('./config/di');
const { titleModuleInit } = require('./module/title/module');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

const diContainer = configureDI();
titleModuleInit(app, diContainer);

module.exports = app;
