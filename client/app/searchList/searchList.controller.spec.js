'use strict';

describe('Component: SearchListComponent', function () {

  // load the controller's module
  beforeEach(module('fndParyBoatsApp'));

  var SearchListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SearchListComponent = $componentController('SearchListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
