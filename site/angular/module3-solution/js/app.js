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
      foundItems: '<',
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


  list.Find = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

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

    for (var i = 0; i < response.data['menu_items'].length; i++) {
        if (searchTerm.length > 0 && response.data['menu_items'][i]['description'].toLowerCase().indexOf(searchTerm) !== -1) {
            foundItems.push(response.data['menu_items'][i]);
        }
    }

    // return processed items
    return foundItems;
    });

  }
}
})();
