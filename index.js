'use strict'

var braintreeWeb = require('braintree-web')
var braingular = window.angular.module('braintree-angular', [])

braingular.component('braintreeDropin', braintreeComponent('dropin'))
braingular.component('braintreePaypal', braintreeComponent('paypal'))

function braintreeComponent (_integrationType) {
  return {
    template: '<div class="braintree-' + _integrationType + '"></div>',
    bindings: {
      tokenizationKey: '@',
      clientToken: '@',
      onPaymentMethodReceived: '&'
    },
    controller: function ($element) {
      var instance

      this.$onInit = function () {
        var self = this
        var authorization = this.tokenizationKey || this.clientToken

        if (!authorization) {
          console.error('requires tokenizationKey or clientToken')
          return
        }

        braintreeWeb.setup(this.tokenizationKey, _integrationType, {
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
  }
}

module.exports = braingular
