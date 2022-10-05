(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/MenuApp/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/MenuApp/templates/main-menu.template.html',
    controller: 'DataController as mainListController',
    resolve: {
      items0: ['DataService', function (DataService) {
        return DataService.getAllCategories();
      }]
    }
  })

  .state('mainList.itemDetail', {
    url: '/item-detail/{category}',
    templateUrl: 'src/MenuApp/templates/item.template.html',
    controller: "ItemDetailController as itemDetailController",
    resolve: {
     items1: ['$stateParams', 'DataService', function ($stateParams, DataService) {
       //console.log($stateParams.itemId)
       return DataService.getItemsForCategory($stateParams.category);
     }]
    }

  }

);

}

})();
