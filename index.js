var braintreeFactory = require('./braintree-factory');
var braingular = window.angular.module('braintree-angular', []);

braingular.factory('$braintree', braintreeFactory.fullBraintreeFactory);

braingular.directive('braintreeDropin', function() {
  return {
    scope: {
      options: '='
    },
    template: '<div id="bt-dropin"></div>',
    controller: function($scope, $braintree) {
      var options = $scope.options || {};
      options.container = 'bt-dropin';

      $braintree.setupDropin(options);
    }
  }
});

module.exports = braingular;
