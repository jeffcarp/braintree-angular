// Everything that's not easily unit testable goes in this file

var braintreeWeb = require('braintree-web')
var braintreeFactory = require('./braintree-factory')
var braingular = window.angular.module('braintree-angular', [])

braingular.factory('$braintree', [
  '$http',
  braintreeFactory(braintreeWeb)
])

braingular.component('braintreeDropin', {
  template: '<div class="braintree-dropin"></div>',
  bindings: {
    tokenizationKey: '@',
    onPaymentMethodReceived: '&'
  },
  controller: function ($element) {
    var instance

    this.$onInit = function () {
      var self = this

      if (!this.tokenizationKey) {
        console.error('requires tokenizationKey')
        return
      }

      braintreeWeb.setup(this.tokenizationKey, 'dropin', {
        container: $element[0],
        onReady: function (integration) {
          instance = integration
        },
        onPaymentMethodReceived: function (payload) {
          if (self.onPaymentMethodReceived) {
            self.onPaymentMethodReceived(payload)
          }
        }
      })
    }

    this.$onDestroy = function () {
      if (instance) {
        instance.teardown(function () {
          instance = null
        })
      }
    }
  }
})
/*
braingular.directive('braintreeDropin', function () {
  return {
    restrict: 'AEC',
    scope: {
      options: '='
    },
    template: '<div id="bt-dropin"></div>',
    controller: ['$scope', '$braintree', function ($scope, $braintree) {
      var options = $scope.options || {}
      options.container = 'bt-dropin'

      $braintree.setupDropin(options)
    }]
  }
})
*/

braingular.directive('braintreePaypal', function () {
  return {
    restrict: 'AEC',
    scope: {
      options: '='
    },
    template: '<div id="bt-paypal"></div>',
    controller: ['$scope', '$braintree', function ($scope, $braintree) {
      var options = $scope.options || {}
      options.container = 'bt-paypal'

      $braintree.setupPayPal(options)
    }]
  }
})

module.exports = braingular
