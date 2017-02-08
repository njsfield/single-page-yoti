const fs = require('fs');
const path = require('path');

// Install Environment Variables
const env = require('env2');
env('./config.env');

// Prep Yoti Client
const YOTI = require('yoti-node-sdk');
const YOTI_SDK_ID = process.env.YOTI_SDK_ID;
const PEM = fs.readFileSync(path.join(__dirname, '../../keys/app.pem'));
const yotiClient = new YOTI(YOTI_SDK_ID, PEM);

module.exports = {
  path: '/profile',
  method: 'GET',
  handler: (req, reply) => {
    let token = req.query.token;
    if (!token) {
      reply('No Token Given');
    }
    // Returns stringified User Profile
    let promise = yotiClient.getActivityDetails(token);
    promise.then((activityDetails) => {
      reply(JSON.stringify(activityDetails.getUserProfile()));
    }).catch((err) => {
      console.log(err);
    });
  }
};
