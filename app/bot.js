const request = require('request');
const cloudinary = require('cloudinary');
const renderer = require('./renderer/renderer');
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

const sendImageMessage = (recipientId, imageUrl) => {
    
    let renderExport = renderer.renderFrame({
            props: {
                x: 0, y: -120, z: 20 + Math.random() * 40
            },
            imageUrl
        }).pngStream();

    let stream = cloudinary.uploader.upload_stream((res) => {
        let image = cloudinary.image(res.public_id, {
            format: 'png',
            width: 470,
            height: 410,
            crop: 'fill'
        }, {
            public_id: recipientId
        });
        let regex = /<img.*?src='(.*?)'/;
        let src = regex.exec(image)[1];
        let messageData = {
            recipient: {
                id: recipientId
            },
            message: {
               attachment: {
                   type: 'image',
                   payload: {
                       url: src
                   }
               } 
            }
        }
        
        callSendAPI(messageData);
    })
    renderExport.pipe(stream);
    renderExport.on('end', stream.end);

}

const receivedMessage = (event) => {
  let senderID = event.sender.id;
  let recipientID = event.recipient.id;
  let timeOfMessage = event.timestamp;
  let message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  //console.log(JSON.stringify(message));

  let messageId = message.mid;
  let messageText = message.text;
  let messageAttachments = message.attachments;

  if (messageAttachments) {
      if (messageAttachments[0].type === 'image') { 
          let imageUrl = messageAttachments[0].payload.url;
          sendImageMessage(senderID, imageUrl);
      }
  } else if (messageText) {
    let response = 'yo yo yo yo';
    sendTextMessage(senderID, response);
  }

}

module.exports = {
    receivedMessage
}