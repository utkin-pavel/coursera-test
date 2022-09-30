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


  list.Find = function () {
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

    promise.then(function(items) {
        if (items && items.length > 0) {
            list.Message = '';
            list.foundItems = items;
        } else {
            list.Message = 'Nothing found!';
            list.foundItems = [];
        }
    });

  };

  list.removeMenuItem = function(itemIndex) {
      list.foundItems.splice(itemIndex, 1);
  }

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath)
    }).then(function (result) {
    // process result and only keep items that match
    var foundItems = [];

    for (var i in result.data.menu_items) {
      var item = result.data.menu_items[i];
      if (searchTerm.length > 0 && item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          foundItems.push(item);
      }
    }

    // return processed items
    return foundItems;
    });

  }
}
})();
