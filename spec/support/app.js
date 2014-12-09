var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname));

app.get('/braintree-angular.js', function(req, res) {
  var path = __dirname+'/../../dist/braintree-angular.js';
  res.send(fs.readFileSync(path, 'utf8'));
});

app.get('/angular.js', function(req, res) {
  var path = __dirname+'/../../node_modules/angular/angular.js';
  res.send(fs.readFileSync(path, 'utf8'));
});

app.get('/client-token', function(req, res) {
  var fakeClientToken = JSON.stringify({
    fake: true,
    authUrl: '',
    clientApiUrl: ''
  });
  fakeClientToken = new Buffer(fakeClientToken).toString('base64');
  res.send(fakeClientToken);
});

module.exports = app;
