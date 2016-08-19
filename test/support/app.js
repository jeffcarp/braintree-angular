var express = require('express')
var fs = require('fs')
var path = require('path')
var app = express()
var clientToken = require('../../client-token')

app.use(express.static(__dirname))

app.get('/braintree-angular.js', function (req, res) {
  res.send(fs.readFileSync(path.resolve(__dirname, '../../braintree-angular.dist.js'), 'utf8'))
})

app.get('/angular.js', function (req, res) {
  res.send(fs.readFileSync(path.resolve(__dirname, '../../node_modules/angular/angular.js'), 'utf8'))
})

app.get('/client-token', function (req, res) {
  res.send(clientToken)
})

module.exports = app
