const request = require('request');
const QRCode = require('qrcode-svg');

// Install Environment Variables
const env = require('env2');
env('./config.env');

module.exports = {
  path: '/qr',
  method: 'GET',
  handler: (req, reply) => {
    request.get(`https://www.yoti.com/qr/${process.env.SCENARIO_ID}`, (e, response, body) => {
      // Get URL
      const url = body.match(/https:\/\/code\.yoti\.com\/.*\?/)[0].slice(0, -1);
      // Get proto
      const proto = body.match(/proto_.*=/)[0];
      // Make SVG
      const svg = new QRCode({content: url, color: '#0000ff'}).svg();
      // Give to client
      reply(JSON.stringify({svg: svg, proto: proto}));
    });
  }
};
