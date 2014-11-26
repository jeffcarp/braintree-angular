var app = require('express')();

app.get('/client-token', function(req, res) {
  var fakeClientToken = JSON.stringify({
    fake: true
  });
  // TODO: base64encode fakeClientToken
  res.send(fakeClientToken);
});

module.exports = app;
