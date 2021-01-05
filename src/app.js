const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

module.exports = app;
