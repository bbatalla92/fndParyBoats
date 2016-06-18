'use strict';

describe('Component: BoatProfileComponent', function () {

  // load the controller's module
  beforeEach(module('fndParyBoatsApp'));

  var BoatProfileComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    BoatProfileComponent = $componentController('BoatProfileComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
