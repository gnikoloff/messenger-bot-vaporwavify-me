'use strict';

const express = require('express');
const app = express();

const renderer = require('./app/renderer/renderer');

const PORT = process.env.PORT || 1201;

app.use(express.static('app'));

app.route('/').get((req, res) => {
    let renderExport = renderer.renderFrame({
        x: 40, y: 40, z: 30
    });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    renderExport.pack().pipe(res); 
});

app.listen(PORT, () => { console.log(`App is listening on ${PORT}`) });