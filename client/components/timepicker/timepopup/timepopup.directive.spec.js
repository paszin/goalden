'use strict';

describe('Directive: timepopup', function () {

  // load the directive's module
  beforeEach(module('goaldenAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<timepopup></timepopup>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the timepopup directive');
  }));
});