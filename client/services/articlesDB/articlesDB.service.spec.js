'use strict';

describe('Service: articlesDB', function () {

  // load the service's module
  beforeEach(module('fndParyBoatsApp'));

  // instantiate service
  var articlesDB;
  beforeEach(inject(function (_articlesDB_) {
    articlesDB = _articlesDB_;
  }));

  it('should do something', function () {
    expect(!!articlesDB).toBe(true);
  });

});
