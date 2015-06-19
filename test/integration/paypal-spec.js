var phantom = require('phantom');
var assert = require('assert');
var app = require('../support/app');

var baseURL = 'http://localhost:3001';

describe('PayPal Integration', function() {

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

  it('adds elements to the page on setup', function(done) {
    ph.createPage(function(page) {

      page.onConsoleMessage(function(msg) {
        console.log('page console -> ', msg);
      });

      page.open(baseURL+'/test-paypal.html', function(status) {
        page.evaluate(function() { return document.documentElement.innerHTML; }, function(result) {

          var input = 'name="payment_method_nonce"';
          assert(result.indexOf(input) !== -1, 'adds nonce input');

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


