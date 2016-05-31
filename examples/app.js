var express = require('express')
var fs = require('fs')
var path = require('path')
var app = express()

app.use(express.static(__dirname))

app.get('/braintree-angular.js', function (req, res) {
  res.send(fs.readFileSync(path.resolve(__dirname, '../dist/braintree-angular.js'), 'utf8'))
})

app.get('/angular.js', function (req, res) {
  res.send(fs.readFileSync(path.resolve(__dirname, '../node_modules/angular/angular.js'), 'utf8'))
})

module.exports = app
