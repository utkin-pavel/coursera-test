(function () {
'use strict';

angular.module('Data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/categories.json")
.service('DataService', DataService);

DataService.$inject = ['$q', '$timeout', 'ApiBasePath', '$http']
function DataService($q, $timeout, ApiBasePath, $http, category) {
  var service = this;

  service.getAllCategories = function () {
    var deferred = $q.defer();

    $http ({
      method: "GET",
      url: (ApiBasePath)}
    ).
    then(function(response) {
      var categories = response.data;
      deferred.resolve(categories);
    })

    return deferred.promise;
  };

  service.getItemsForCategory = function (category) {

    var deferred = $q.defer();

    $http ({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + category)}
    ).
    then(function(response) {
      var categories = response.data.menu_items;
      deferred.resolve(categories);
    })

    return deferred.promise;
  };

}

})();
