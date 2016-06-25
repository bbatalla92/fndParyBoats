'use strict';

describe('Component: StatesComponent', function () {

  // load the controller's module
  beforeEach(module('fndParyBoatsApp'));

  var StatesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    StatesComponent = $componentController('StatesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
