'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

global.EventEmitter = require('events').EventEmitter;

const renderer = require('./app/renderer/renderer');
const bot = require('./app/bot');

const PORT = process.env.PORT || 1201;
const token = process.env.FB_VERIFY_TOKEN;
const access = process.env.FB_ACCESS_TOKEN;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app'));

app.route('/').get((req, res) => {
    let renderExport = renderer.renderFrame({
        pos: {
                x: 0, 
                y: -120, 
                z: 20 + Math.random() * 40
            },
            imageUrl
    }).pngStream();
    res.writeHead(200, { 'Content-Type': 'image/png' });
    renderExport.pipe(res); 
});

app.route('/webhook/').get((req, res) => {
    if (req.query['hub.verify_token'] === token) {
        res.send(req.query['hub.challenge'])
    }
    res.send('No entry');
})

app.route('/webhook').post((req, res) => {
  let data = req.body;
  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      let pageID = entry.id;
      let timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach((event) => {
        if (event.message) {
          bot.receivedMessage(event);
        } else {
          //console.log("Webhook received unknown event: ", event);
          console.log("Webhook received unknown event");
        }
      });
    });
    // Assume all went well.
    res.sendStatus(200);
  }
});

app.listen(PORT, () => { console.log(`App is listening on ${PORT}`) });