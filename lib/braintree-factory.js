function braintreeFactory (braintree) {
  return function braintreeAngular (braintreeValue, $q) {
    var $braintree = {}

    Object.keys(braintree).forEach(function (key) {
      $braintree[key] = braintree[key]
    })

    $braintree.getClientToken = function () {
       var deferred = $q.defer();
      deferred.resolve(braintreeValue.token);
      debugger;
      return deferred.promise;
    }

    $braintree.setupDropin = function (options) {
       $braintree.getClientToken()
        .then(function (token) {
          braintree.setup(token, 'dropin', options)
        })
        .catch(function (data, status) {
          console.error('error fetching client token at ' , data, status)
        })
    }

    $braintree.setupPayPal = function (options) {
       $braintree.getClientToken()
        .then(function (token) {
          braintree.setup(token, 'paypal', options)
        })
        .catch(function (data, status) {
          console.error('error fetching client token at ' , data, status)
        })
    }

    return $braintree
  }
}

module.exports = braintreeFactory
