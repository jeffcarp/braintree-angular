var express = require('express');
var fs = require('fs');
var app = express();
var clientToken = require('../../client-token');

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
  res.send(clientToken);
});

module.exports = app;
