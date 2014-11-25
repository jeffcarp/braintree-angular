var app = require('express')();

app.get('/client-token', function(req, res) {
  res.send('hey look a client token');
});

module.exports = app;
