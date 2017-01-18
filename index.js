'use strict';

const express = require('express');
const app = express();

const renderer = require('./app/renderer/renderer');

const PORT = process.env.PORT || 1201;
const token = process.env.FB_VERIFY_TOKEN;
const access = process.env.FB_ACCESS_TOKEN;

app.use(express.static('app'));

app.route('/').get((req, res) => {
    let renderExport = renderer.renderFrame({
        x: 0, y: -220, z: 20 + Math.random() * 40
    });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    renderExport.pngStream().pipe(res); 
});

app.route('/webhook/').get((req, res) => {
    if (req.query['hub.verify_token'] === token) {
        res.send(req.query['hub.challenge'])
    }
    res.send('No entry');
})

app.listen(PORT, () => { console.log(`App is listening on ${PORT}`) });