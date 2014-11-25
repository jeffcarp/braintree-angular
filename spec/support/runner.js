var app = require('./app');
var spawn = require('child_process').spawn;

var server = app.listen(3001, '0.0.0.0', function() {

  var cmd = 'npm run integration';
  var child = spawn('npm', ['run', 'integration']);

  child.stdout.on('data', function(chunk) {
    console.log(chunk.toString('utf8'));
  });
  child.stdout.on('end', function() {
    server.close();
  });

});

