'use strict';

angular.module('fndParyBoatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articleList', {
        url: '/articleList',
        template: '<article-list></article-list>'
      });
  });
