function braintreeFactory(braintree) {
  return function braintreeAngular(clientTokenPath, $http) {
    var $braintree = {};

    $braintree.clientToken = null;

    Object.keys(braintree).forEach(function(key) {
      $braintree[key] = braintree[key];
    });

    $braintree.getClientToken = function (path) {
      return $http.get(path);
    }

    $braintree.setupDropin = function(options, queryString) {
      var path = queryString ? clientTokenPath+'?'+queryString : clientTokenPath;
      $braintree.getClientToken(path)
        .success(function(token) {
          braintree.setup(token, 'dropin', options);
        })
        .error(function(data, status) {
          console.error('error fetching client token at '+path, data, status);
        });
    };

    $braintree.setupPayPal = function(options) {
      $braintree.getClientToken()
        .success(function(token) {
          braintree.setup(token, 'paypal', options);
        })
        .error(function(data, status) {
          console.error('error fetching client token at '+clientTokenPath, data, status);
        });
    };

    return $braintree;
  }
}

module.exports = braintreeFactory;
