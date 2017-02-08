// Button to generate QRCode
var qrbutton = document.querySelector('.get-qr-button');
// QR Code container element
var qrcode = document.querySelector('.qr-code-output');
// Profile name element
var profileimg = document.querySelector('.profileimg');
// Profile name element
var profilename = document.querySelector('.profilename');

// 1. On click, call route to get QRCode svg
qrbutton.addEventListener('click', function () {
  var o = new XMLHttpRequest();
  o.addEventListener('load', function (e) {
    var responseObj = JSON.parse(e.target.responseText);
    qrbutton.style.display = 'none';
    qrcode.innerHTML = responseObj.svg;
    listenForToken(responseObj.proto);
  });
  o.open('GET', '/qr');
  o.send();
});

// 2. After SVG received, set up WebSocket with YOTI to handle response
function listenForToken (proto) {
  var host = 'wss://api.yoti.com/api/v1/connect-sessions/' + proto;
  var socket = new WebSocket(host);
  socket.onopen = function () {
    socket.send(JSON.stringify({subscription: proto}));
  };
  // Get Token
  socket.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    switch (data.status) {
      case 'COMPLETED' : {
        getProfile(data.token);
      }
    }
  };
}

// 3. Call the /profile route with token, decode profile and send back
function getProfile (token) {
  var o = new XMLHttpRequest();
  o.addEventListener('load', function (e) {
    qrcode.style.display = 'none';
    var profile = JSON.parse(e.target.responseText);
    profilename.innerHTML = 'Name: ' + profile.givenNames;
    profileimg.src = profile.selfie;
  });
  o.open('GET', '/profile?token=' + token);
  o.send();
}
