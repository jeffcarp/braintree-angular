var braintreeFactory = require('./braintree-factory');
var braingular = window.angular.module('braintree-angular', []);

braingular.factory('$braintree', braintreeFactory.fullBraintreeFactory);

braingular.directive('braintreeDropin', function () {
  return {
    restrict: 'AEC',
    scope: {
      options: '=',
      tokenOptions: '=',
      btToken: '='
    },
    template: '<div id="bt-dropin"></div>',
    bindToController: true,
    controller: ['$braintree', function ($braintree) {
      var options = this.options || {};
      var tokenOptions = this.tokenOptions || {};
      var btToken = this.btToken || null;

      options.container = 'bt-dropin';

      $braintree.setup('dropin', options, tokenOptions, btToken);
    }],
    controllerAs: 'btDropinCtrl'
  };
});

braingular.directive('braintreePaypal', function () {
  return {
    restrict: 'AEC',
    scope: {
      options: '=',
      tokenOptions: '=',
      btToken: '='
    },
    template: '<div id="bt-paypal"></div>',
    bindToController: true,
    controller: ['$braintree', function ($braintree) {
      var options = this.options || {};
      var tokenOptions = this.tokenOptions || {};
      var btToken = this.btToken || null;

      options.container = 'bt-paypal';

      $braintree.setup('paypal', options, tokenOptions, btToken);
    }],
    controllerAs: 'btDropinCtrl'
  };
});

module.exports = braingular;
