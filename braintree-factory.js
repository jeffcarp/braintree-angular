var braintree = require('braintree-web');

function braintreeFactory(clientTokenPath, $http) {
  var $braintree = {};

  $braintree.clientToken = null;

  Object.keys(braintree).forEach(function (key) {
    $braintree[key] = braintree[key];
  });

  function getClientToken(tokenOptions) {
    tokenOptions = tokenOptions === undefined ? {} : tokenOptions;

    return $http.get(clientTokenPath, {
      params: tokenOptions
    });
  }

  $braintree.getClientToken = function () {
    return getClientToken();
  };

  function setup(token, type, options) {
    braintree.setup(token, type, options);
  }

  $braintree.setup = function (type, options, tokenOptions, btToken) {
    if (!btToken) {
      getClientToken(tokenOptions)
        .success(function (token) {
          setup(token, type, options);
        })
        .error(function (data, status) {
          console.error('error fetching client token at ' + clientTokenPath, data, status);
        });
    } else {
      setup(btToken, type, options);
    }
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
