'use strict';

const express = require('express');
const app = express();

const renderer = require('./app/renderer/renderer');

const PORT = process.env.PORT || 1201;

app.use(express.static('app'));

app.route('/').get((req, res) => {
    let renderExport = renderer.renderFrame({
        x: 0, y: -190, z: 30
    });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    renderExport.pngStream().pipe(res); 
});

app.listen(PORT, () => { console.log(`App is listening on ${PORT}`) });