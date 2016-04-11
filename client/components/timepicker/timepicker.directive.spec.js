'use strict';

describe('Directive: timepicker', function () {

  // load the directive's module and view
  beforeEach(module('goaldenAppApp'));
  beforeEach(module('components/timepicker/timepicker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<timepicker></timepicker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the timepicker directive');
  }));
});