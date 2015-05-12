var phantom = require('phantom');
var assert = require('assert');
var app = require('../support/app');

var baseURL = 'http://localhost:3001';

describe('Advanced Integration', function() {

  var ph;
  var server;
  this.timeout(1e4);

  before(function(done) {
    phantom.create(function(phInstance) {
      ph = phInstance;
      server = app.listen(3001, function() {
        done();
      });
    });
  });

  it('initializes API client', function(done) {
    ph.createPage(function(page) {

      page.onConsoleMessage(function(msg) {
        console.log('page console -> ', msg);
      });

      page.open(baseURL+'/test-advanced.html', function(status) {
        page.evaluate(function() { return window.braintreeApiInitialized; }, function(result) {

          assert(result, 'Braintree API client was initialized');

          done();
        });
      });
    });
  });

  after(function(done) {
    ph.exit();
    server.close();
    done();
  });
});


