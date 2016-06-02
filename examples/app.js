const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.resolve('..', __dirname)))

module.exports = app
