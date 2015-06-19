var express = require('express');
var braintree = require('braintree');
var fs = require('fs');
var bodyParser = require('body-parser');
var dummyClientToken = require('../client-token');
var app = express();

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "YOUR_MERCHANT_ID",
  publicKey: "YOUR_PUBLIC_KEY",
  privateKey: "YOUR_PRIVATE_KEY"
});

var angularStr = fs.readFileSync(__dirname+'/../node_modules/angular/angular.js', 'utf8');
var braintreeAngularStr = fs.readFileSync(__dirname+'/../dist/braintree-angular.js', 'utf8');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/client-token', function(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    if (err || !response || !response.clientToken) {
      if (err.name === 'authenticationError') {
        console.error('Please fill in examples/server.js with your credentials from Account->API Keys in your Sandbox dashboard: https://sandbox.braintreegateway.com/');
        console.error('Using a dummy client token... this may or may not work');
        res.send(dummyClientToken);
      } else {
        console.error(err);
        res.send(err);
      }
    } else {
      var clientToken = response.clientToken
      res.send(clientToken);
    }
  });
});

app.post('/buy-something', function(req, res) {
  var nonce = req.body.payment_method_nonce;
  gateway.transaction.sale({
    amount: "10.00",
    paymentMethodNonce: nonce
  }, function (err, result) {
    if (err) {
      res.send('error:', err);
    } else {
      res.send('successfully charged $10, check your sandbox dashboard!');
    }
  });
});

app.get('/angular.js', function(req, res) {
  res.send(angularStr);
});

app.get('/braintree-angular.js', function(req, res) {
  res.send(braintreeAngularStr);
});

app.use(express.static(__dirname));

var port = 8000;
app.listen(port, '0.0.0.0', function() {
  console.log('Running at 0.0.0.0:'+port);
  console.log('Check out these examples:');
  var files = fs.readdirSync(__dirname)
    .filter(function(fileName) {
      return fileName.match(/\.html$/);
    })
    .map(function(fileName) {
      console.log('- http://localhost:'+port+'/'+fileName);
    });

});
