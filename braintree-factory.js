var braintree = require('braintree-web');

function braintreeService(clientTokenPath, $http) {
  var $braintree = {};

  if (!clientTokenPath) {
    var msg = 'braintreeService needs module.constant("clientTokenPath", "/path") to be defined';
    throw new Error(msg);
  }

  $braintree.clientToken = null;

  Object.keys(braintree).forEach(function(key) {
    $braintree[key] = braintree[key];
  });

  function getClientToken() {
    return $http.get(clientTokenPath);
  }

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

var fullBraintreeService = [
  'clientTokenPath',
  '$http',
  braintreeService
];

module.exports = {
  braintreeService: braintreeService,
  fullBraintreeService: fullBraintreeService
};
