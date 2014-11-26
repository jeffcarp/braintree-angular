describe("$braintree.setupDropin()", function() {

  iit("instantiates Dropin", function(done) {
    var angDiv = document.createElement('div');
    angDiv.setAttribute('ng-controller', 'testCtrl');
    angDiv.innerHTML = '<form id="test-dropin"></form>';
    document.body.appendChild(angDiv);

    angular.module('dropinApp', ['braintree-angular'])
      .constant('clientTokenPath', 'http://0.0.0.0:3001/client-token')
      .controller('testCtrl', ['$braintree', function($braintree) {

        expect($braintree.setupDropin).toBeDefined();

        $braintree.setupDropin({
          container: 'test-dropin'
        });

        // TODO: Make sure it succeeded or at least is starting up

        done();
      }]);

    angular.bootstrap(angDiv, ['dropinApp']);

  });

});
