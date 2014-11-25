describe("braintree service", function() {

  it("injects '$braintree' into a controller", function(done) {
    var angDiv = document.createElement('div');
    angDiv.innerHTML = '<div ng-controller="testCtrl"></div>';
    document.body.appendChild(angDiv);

    var controllerRan = false;

    angular.module('testApp', ['braintree-angular'])
      .constant('clientTokenPath', 'http://0.0.0.0:3001/client-token')
      .controller('testCtrl', ['$scope', '$braintree', function($scope, $braintree) {
        controllerRan = true;

        expect($braintree).toBeDefined();
        expect($braintree.api).toBeDefined();
        expect($braintree.dropin).toBeDefined();
        expect($braintree.Form).toBeDefined();
        expect($braintree.setup).toBeDefined();

        done();
      }]);
    angular.bootstrap(document, ['testApp']);

    expect(controllerRan).toBe(true);
  });

  // Need to figure out how to erase state in-between tests...

  it("errors out if the url is bogus and it can't fetch a client token");
});
