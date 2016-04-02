'use strict';

describe('Service: groupDialog', function () {

  // load the service's module
  beforeEach(module('goaldenAppApp'));

  // instantiate service
  var groupDialog;
  beforeEach(inject(function (_groupDialog_) {
    groupDialog = _groupDialog_;
  }));

  it('should do something', function () {
    expect(!!groupDialog).toBe(true);
  });

});
