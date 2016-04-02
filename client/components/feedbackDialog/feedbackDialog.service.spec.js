'use strict';

describe('Service: feedbackDialog', function () {

  // load the service's module
  beforeEach(module('goaldenAppApp'));

  // instantiate service
  var feedbackDialog;
  beforeEach(inject(function (_feedbackDialog_) {
    feedbackDialog = _feedbackDialog_;
  }));

  it('should do something', function () {
    expect(!!feedbackDialog).toBe(true);
  });

});
