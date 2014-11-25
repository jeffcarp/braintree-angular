braintree-angular
=================

A module for using [braintree-web](https://github.com/braintree/braintree-web) in your Angular app.

## Install

```bash
# npm install braintree-web # not just yet
```

```bash
# bower install braintree-web # not just yet
```

## Currently supported integrations:

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
