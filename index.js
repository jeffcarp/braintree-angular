'use strict'

var braintreeWeb = require('braintree-web')
var braingular = window.angular.module('braintree-angular', [])

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

braingular.component('braintreePaypal', {
  template: '<div class="braintree-paypal"></div>',
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

      braintreeWeb.setup(this.tokenizationKey, 'paypal', {
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

module.exports = braingular
