(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      items: '<',
      myTitle: '@title',
      badRemove: '=',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var list = this;

  //narrowIt.seacrchTerm  = "";

  list.Find = function () {
    list.foundItems = MenuSearchService.getMatchedMenuItems(list.seacrchTerm);

  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (seacrchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath)
    }).then(function (result) {
    // process result and only keep items that match
    var foundItems = [];

    for (var element in result.data.menu_items) {
     var item = result.data.menu_items[element];

    if (item.name.includes(seacrchTerm)) {
      foundItems.push(item);
    }
    }

    // return processed items
    return foundItems;
    });

  }

}

})();
