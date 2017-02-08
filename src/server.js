const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const YotiClient = require('yoti-node-sdk');
const fs = require('fs');
const path = require('path');
const request = require('request');
const QRCode = require("qrcode-svg");
// const env = require('env2')('./api-keys.env');

const CLIENT_SDK_ID = '9c50570f-a376-482a-9930-9ee434dedec9'
const SCENARIO_ID = '22cfd7a3-6b84-4233-8928-706e165ab801'
const PEM = fs.readFileSync(path.join(__dirname, "../keys/app.pem"));
var yotiClient = new YotiClient(CLIENT_SDK_ID, PEM)
const server = new Hapi.Server();

var tls = {
  key: fs.readFileSync(path.join(__dirname, '../keys/server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys/server-cert.pem'))
};

const port = process.env.PORT || 4000;

server.connection({port: port, tls: tls });


server.register(Inert, (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  })
});

server.register(Vision, (err) => {
  if (err) throw err;

  server.views({
    engines: {
      html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
  });

  server.route([
    {
      path: '/',
      method: 'GET',
      handler: (req, reply) => {
        reply.view('index');

      }
    },
    {
      path: '/getqr',
      method: 'GET',
      handler: (req, reply) => {
        request.get(`https://www.yoti.com/qr/${SCENARIO_ID}`, (error, response, body) => {
          let url = body.match(/https:\/\/code\.yoti\.com\/.*\?/)[0].slice(0, -1);
          var svg = new QRCode({content: url, color: '#0000ff'}).svg();
          reply(svg);
        })
      }
    },
    {
      path: '/thankyou',
      method: 'GET',
      handler: (req, reply) => {
      	let token = req.query.token;
      	if(!token) {
      		reply.view('error', {
      			error : "No token has been provided."
      		});
      		return;
      	}
      	let promise = yotiClient.getActivityDetails(token);
      	promise.then((activityDetails) => {
          reply.view('verified', {
      			userId  : activityDetails.getUserId(),
      			profile : activityDetails.getUserProfile(),
      			outcome : activityDetails.getOutcome()
      		})
      	}).catch((err) => {
      		console.error(err);
      		reply.view('error', {
      			error : err
      		});
      		return;
  	    })
      }
    }
  ]);
});

module.exports = server;
