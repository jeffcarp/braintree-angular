var braintree = require('braintree-web');

function braintreeFactory(clientTokenPath, $http) {
  var $braintree = {};

  $braintree.clientToken = null;

  Object.keys(braintree).forEach(function(key) {
    $braintree[key] = braintree[key];
  });

  function getClientToken() {
    return $http.get(clientTokenPath);
  }

  $braintree.getClientToken = function() {
    return getClientToken();
  };

  $braintree.setupDropin = function(options) {
    getClientToken()
      .success(function(token) {
        braintree.setup(token, 'dropin', options);
      })
      .error(function(data, status) {
        console.error('error fetching client token at '+clientTokenPath, data, status);
      });
  };

  return $braintree;
}

var fullBraintreeFactory = [
  'clientTokenPath',
  '$http',
  braintreeFactory
];

module.exports = {
  braintreeFactory: braintreeFactory,
  fullBraintreeFactory: fullBraintreeFactory
};
