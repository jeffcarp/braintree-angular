var braintreeFactory = require('./braintree-factory');
var braingular = window.angular.module('braintree-angular', []);

braingular.factory('$braintree', braintreeFactory.fullBraintreeFactory);

braingular.directive('braintreeDropin', function() {
  return {
    restrict: 'EA',
    scope: {
      options: '='
    },
    template: '<div id="bt-dropin"></div>',
    controller: ['$scope', '$braintree', function($scope, $braintree) {
      var options = $scope.options || {};
      options.container = 'bt-dropin';

      $braintree.setupDropin(options);
    }]
  }
});

braingular.directive('braintreePaypal', function() {
  return {
    restrict: 'EA',
    scope: {
      options: '='
    },
    template: '<div id="bt-paypal"></div>',
    controller: function($scope, $braintree) {
      var options = $scope.options || {};
      options.container = 'bt-paypal';

      $braintree.setupPayPal(options);
      
      $scope.$on('$destroy',function() {
        angular.element(document.getElementById('braintree-dropin-modal-frame')).remove();
        window.Braintree = undefined;
      });
    }
  }
});

module.exports = braingular;
