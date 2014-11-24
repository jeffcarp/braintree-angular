var braingular = window.angular.module('braintree-angular', []);
var braintree = require('braintree-web');

braingular.factory('$braintree', function() {
  return braintree;
});

module.exports = braingular;
