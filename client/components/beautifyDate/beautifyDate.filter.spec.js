'use strict';

describe('Filter: beautifyDate', function () {

  // load the filter's module
  beforeEach(module('goaldenAppApp'));

  // initialize a new instance of the filter before each test
  var beautifyDate;
  beforeEach(inject(function ($filter) {
    beautifyDate = $filter('beautifyDate');
  }));

  it('should return the input prefixed with "beautifyDate filter:"', function () {
    var text = 'angularjs';
    expect(beautifyDate(text)).toBe('beautifyDate filter: ' + text);
  });

});
