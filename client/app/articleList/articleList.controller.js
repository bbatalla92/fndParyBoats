'use strict';
(function(){

class ArticleListComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('fndParyBoatsApp')
  .component('articleList', {
    templateUrl: 'app/articleList/articleList.html',
    controller: ArticleListComponent
  });

})();
