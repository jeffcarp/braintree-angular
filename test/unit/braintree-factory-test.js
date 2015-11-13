var assert = require('assert');
var braintreeFactory = require('../../lib/braintree-factory');
var jsdom = require('../../../jsdom');

// TODO: See if using a mocking library would help
var fakeBraintreeWeb = {
  setup: function () {}
};

describe('braintreeFactory', function () {
  describe('getClientToken', function () {

    it('should call $http.get', function (done) {
      var fake$httpGetCallCount = 0;
      var fake$httpGetLastArg;

      var fake$http = {
        get: function (arg) {
          fake$httpGetCallCount += 1;
          fake$httpGetLastArg = arg;
        }
      };

      var btNg = braintreeFactory(fakeBraintreeWeb)('/path', fake$http);

      btNg.getClientToken();

      assert(fake$httpGetCallCount === 1);
      assert(fake$httpGetLastArg === '/path');

      done();
    });

    context('with customer_id', function () {

      it('should call $http.get with customer_id', function (done) {
        var fake$httpGetCallCount = 0;
        var fake$httpGetLastArg;

        var fake$http = {
          get: function (arg) {
            fake$httpGetCallCount += 1;
            fake$httpGetLastArg = arg;
          }
        };

        var btNg = braintreeFactory(fakeBraintreeWeb)('/path', fake$http);

        btNg.getClientToken({customerId: '567'});

        assert(fake$httpGetCallCount === 1);
        assert(fake$httpGetLastArg === '/path?customerId=567');

        done();
      });

    });

  });
});
