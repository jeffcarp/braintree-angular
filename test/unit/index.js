require('angular/angular')
require('angular-mocks')
require('../..')

global.angular = window.angular
global.inject = global.angular.mock.inject
global.ngModule = global.angular.mock.module

describe('braintree-angular', function () {
  beforeEach(ngModule('braintree-angular'))

  beforeEach(() => {
    window.console = {
      log: jest.genMockFunction(),
      error: jest.genMockFunction()
    }
  })

  var element
  var scope
  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new()
    element = angular.element('<braintree-dropin></braintree-dropin>')
    element = $compile(element)(scope)
    scope.$apply()
  }))

  describe('if neither tokenizationKey nor clientToken are passed', () => {
    it('should print an error', () => {
      const controller = element.controller('braintreeDropin')
      expect(controller.tokenizationKey).toBeUndefined()
      expect(window.console.error).toBeCalled()
    })
  })
})

