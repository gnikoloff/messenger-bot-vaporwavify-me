'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');
const cloudinary = require('cloudinary');

const renderer = require('./app/renderer/renderer');

const PORT = process.env.PORT || 1201;
const token = process.env.FB_VERIFY_TOKEN;
const access = process.env.FB_ACCESS_TOKEN;

const callSendAPI = (messageData) => {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: access },
    method: 'POST',
    json: messageData
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

const sendTextMessage = (recipientId, messageText) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
  callSendAPI(messageData);
}

const sendImageMessage = (recipientId) => {
    
    let renderExport = renderer
        .renderFrame({
            x: 0, y: -120, z: 20 + Math.random() * 40
        })
        .pngStream();

    let output = cloudinary.uploader.upload._stream((res) => { console.log(res) })

    let stream = cloudinary.uploader.upload_stream((res) => {
        console.log(res);
        cloudinary.image(rs.public_id, {
            format: 'png',
            width: 600,
            height: 400,
            crop: 'fill'
        }, {
            public_id: recipientId
        });
    })
    renderExport.on('data', () => {
        stream.write();
    });
    renderExport.on('end', () => {
        stream.end();
    });

}

const receivedMessage = (event) => {
  let senderID = event.sender.id;
  let recipientID = event.recipient.id;
  let timeOfMessage = event.timestamp;
  let message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  let messageId = message.mid;
  let messageText = message.text;
  let messageAttachments = message.attachments;

  console.log(`
        -------------------------------------------------------------------
            ${messageAttachments}
        -------------------------------------------------------------------
  `)

  if (messageAttachments) {
      if (messageAttachments[0].type === 'image') {
          //let imageUrl = messageAttachments[0].payload.url;
          //let renderExport = renderer.renderFrame({
          //      x: 0, y: -120, z: 20 + Math.random() * 40
          //});
          //res.writeHead(200, { 'Content-Type': 'image/png' });
          //renderExport.pngStream().pipe(res); 
          sendImageMessage(senderID);
      }
  } else if (messageText) {
    let response = 'yo yo yo yo';
    sendTextMessage(senderID, response);
  }

}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app'));

app.route('/').get((req, res) => {
    let renderExport = renderer.renderFrame({
        x: 0, y: -120, z: 20 + Math.random() * 40
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

app.route('/webhook').post((req, res) => {
  let data = req.body;
  console.log(req.body);
  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      let pageID = entry.id;
      let timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach((event) => {
        if (event.message) {
          receivedMessage(event);
        } else {
          //console.log("Webhook received unknown event: ", event);
          console.log("Webhook received unknown event");
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

app.listen(PORT, () => { console.log(`App is listening on ${PORT}`) });