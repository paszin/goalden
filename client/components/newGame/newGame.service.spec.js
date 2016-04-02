'use strict';

describe('Service: newGame', function () {

  // load the service's module
  beforeEach(module('goaldenAppApp'));

  // instantiate service
  var newGame;
  beforeEach(inject(function (_newGame_) {
    newGame = _newGame_;
  }));

  it('should do something', function () {
    expect(!!newGame).toBe(true);
  });

});
