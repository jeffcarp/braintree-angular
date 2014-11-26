// Need to figure out how to erase state in-between tests...

describe("braintree service", function() {

  it("injects '$braintree' into a controller", function(done) {
    var angDiv = document.createElement('div');
    angDiv.setAttribute('ng-controller', 'testCtrl');
    document.body.appendChild(angDiv);

    var controllerRan = false;

    angular.module('integrationApp', ['braintree-angular'])
      .constant('clientTokenPath', 'http://0.0.0.0:3001/client-token')
      .controller('testCtrl', ['$braintree', function($braintree) {
        controllerRan = true;

        expect($braintree).toBeDefined();
        expect($braintree.api).toBeDefined();
        expect($braintree.dropin).toBeDefined();
        expect($braintree.Form).toBeDefined();
        expect($braintree.setup).toBeDefined();

        done();
      }]);

    angular.bootstrap(angDiv, ['integrationApp']);

    expect(controllerRan).toBe(true);
  });

  //it("errors out if the url is bogus and it can't fetch a client token");
});
