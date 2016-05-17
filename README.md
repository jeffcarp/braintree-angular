braintree-angular
=================

[![Build Status](http://img.shields.io/travis/jeffcarp/braintree-angular/master.svg?style=flat)](https://travis-ci.org/jeffcarp/braintree-angular)
[![npm version](http://img.shields.io/npm/v/braintree-angular.svg?style=flat)](https://www.npmjs.org/package/braintree-angular)


A module for using [braintree-web](https://github.com/braintree/braintree-web) in your Angular app.

> Disclaimer: `braintree-angular` is not an official Braintree module.

## Install

```bash
npm install braintree-angular
```

```bash
bower install braintree-angular
```

## Run the example

```sh
git clone git@github.com:jeffcarp/braintree-angular.git
cd braintree-angular
npm install
npm run example
# Open localhost:8000/dropin.html
```

## Setup

For all integrations, first declare a `clientTokenPath` constant to tell Braintree where to fetch your client token.

```javascript
var yourApp = angular.module('yourApp', ['braintree-angular'])
  .constant('clientTokenPath', '/path-or-url-to-your-client-token');
```

Client tokens are generated with your Braintree server library. Here are guides on how to [set up the server library](https://developers.braintreepayments.com/sdk/server/setup) and how to [generate a client token](https://developers.braintreepayments.com/sdk/overview/generate-client-token).

---

#### Currently supported integrations:

## Drop-in UI

```html
<form action="/buy-something" method="post">
  <h1>Buy some things</h1>

  <braintree-dropin></braintree-dropin>

  <input
    type="submit"
    value="Buy for $14"
    />

</form>
```
If you are using Braintree subscriptions you may need to pass a customerId to your server when creating a client token. You can add the customerId as a parameter to  braintree-dropin like this: `<braintree-dropin customer-id='yourCustomerId'></braintree-dropin>`. A query string will be appended to the url defined in the clientTokenPath constant like this: `/client-token?customerId=yourCustomerId`.

```javascript
angular.module('example', ['braintree-angular'])
  .constant('clientTokenPath', '/client-token');
```

## PayPal Standalone Button

```html
<braintree-paypal></braintree-paypal>
```

## Advanced Integration (tokenization)

```html
<div ng-app="yourApp" ng-controller="yourCtrl">

  <input
    ng-model="creditCard.number"
    placeholder="4111111111111111"
    />

  <input
    ng-model="creditCard.expirationDate"
    placeholder="10/18"
    />

  <input
    type="submit"
    value="Purchase"
    onClick="payButtonClicked()"
    />

</div>
```

```javascript
angular.module('yourApp', ['braintree-angular'])
  .constant('clientTokenPath', '/client-token')
  .controller('yourCtrl', ['$scope', '$braintree', function($scope, $braintree) {

    var client;
    $scope.creditCard = {
      number: '',
      expirationDate: ''
    };

    var startup = function() {
      $braintree.getClientToken().success(function(token) {
        client = new $braintree.api.Client({
          clientToken: token
        });
      });
    }

    $scope.payButtonClicked = function() {

      // - Validate $scope.creditCard
      // - Make sure client is ready to use

      client.tokenizeCard({
        number: $scope.creditCard.number,
        expirationDate: $scope.creditCard.expirationDate
      }, function (err, nonce) {

        // - Send nonce to your server (e.g. to make a transaction)

      });
    };

    startup();
  }]);
```

The full set of options you can pass to `client.tokenizeCard` are available [in the Braintree docs](https://developers.braintreepayments.com/javascript/sdk/client/credit-cards#options). Please be advised that using the advanced integration method widens your [PCI compliance](https://payments-reference.org/payment-cards/pci-compliance/) scope from [SAQ A](https://payments-reference.org/payment-cards/pci-compliance/saqs/#saq-a) to [SAQ A-EP](https://payments-reference.org/payment-cards/pci-compliance/saqs/#saq-a-ep).
