braintree-angular
=================

[![Build Status](http://img.shields.io/travis/jeffcarp/braintree-angular.svg?style=flat)](https://travis-ci.org/jeffcarp/braintree-angular)
[![npm version](http://img.shields.io/npm/v/braintree-angular.svg?style=flat)](https://travis-ci.org/jeffcarp/braintree-angular)


A module for using [braintree-web](https://github.com/braintree/braintree-web) in your Angular app.

> Small disclaimer: `braintree-angular` is not an official Braintree module. It is meant only to be a thin layer to make working with `braintree-web` in Angular feel more natural.

## Install

```bash
npm install braintree-angular
```

```bash
bower install braintree-angular
```

## Setup

For all integrations, first declare a `clientTokenURL` constant to tell Braintree where to fetch your client token.

```javascript
var yourApp = angular.module('yourApp', [])
  .constant('clientTokenURL', '/path-or-url-to-your-client-token');
```

Client tokens are generated with your Braintree server library. Here are guides on how to [set up the server library](https://developers.braintreepayments.com/sdk/server/setup) and how to [generate a client token](https://developers.braintreepayments.com/sdk/overview/generate-client-token).

## Currently supported integrations:

### Dropin

```html
<form action="/buy-something" method="post">
  <h1>Buy some things</h1>
  <div id="credit-card">
  </div>

  <input
    type="submit"
    value="buy for $14"
    />

</form>
```

```javascript
angular.module('example', ['braintree-angular'])
  .constant('clientTokenPath', '/client-token')
  .controller('testCtrl', ['$scope', '$braintree', function($scope, $braintree) {

    $braintree.setupDropin({
      container: 'credit-card'
    });

  }]);
```

Run the example:

```bash
cd examples/dropin
# fill in your sandbox credentials in server.js
node server
# navigate to http://localhost:8000
```

### Advanced

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
angular.module('yourApp', [])
  .controller('yourCtrl', ['$scope', '$braintree', function($scope, $braintree) {

    var client;
    $scope.creditCard = {
      number: '',
      expirationDate: ''
    };

    var startup = function() {
      // A fake function simulating the fetching of a clientToken
      fetchClientToken(function(err, clientToken) {
        client = new $braintree.api.Client({
          clientToken: clientToken
        });
      });
    }

    $scope.payButtonClicked = function() {

      // Validate $scope.creditCard

      client.tokenizeCard({
        number: $scope.creditCard.number,
        expirationDate: $scope.creditCard.expirationDate
      }, function (err, nonce) {

        // Send nonce to your server (e.g. to make a transaction)

      });
    };

    startup();
  }]);
```
