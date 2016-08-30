'use strict';

describe('Component: SiteAdminComponent', function () {

  // load the controller's module
  beforeEach(module('fndParyBoatsApp'));

  var SiteAdminComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SiteAdminComponent = $componentController('SiteAdminComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
