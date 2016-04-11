'use strict';

describe('Service: GameDialog', function () {

  // load the service's module
  beforeEach(module('goaldenAppApp'));

  // instantiate service
  var GameDialog;
  beforeEach(inject(function (_GameDialog_) {
    GameDialog = _GameDialog_;
  }));

  it('should do something', function () {
    expect(!!GameDialog).toBe(true);
  });

});
