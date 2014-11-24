describe("integration", function() {

  it("successfully injects $braintree into a controller", function(done) {

    var angDiv = document.createElement('div');
    angDiv.innerHTML = '<div ng-controller="testCtrl"></div>';
    document.body.appendChild(angDiv);

    var controllerRan = false;

    angular.module('testApp', ['braintree-angular'])
      .controller('testCtrl', ['$scope', '$braintree', function($scope, $braintree) {
        controllerRan = true;

        expect($braintree).toBeDefined();
        expect($braintree.api).toBeDefined();
        expect($braintree.dropin).toBeDefined();
        expect($braintree.Form).toBeDefined();
      }]);

    angular.bootstrap(document, ['testApp']);

    expect(controllerRan).toBe(true);

    done();
  });
});
