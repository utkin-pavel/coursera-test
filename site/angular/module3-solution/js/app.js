(function () {
"use strict";

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItems)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

function foundItems() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundlist',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menu = this;

	menu.input = '';
	menu.found = [];
	menu.showNothing = false;

	menu.filter = function () {
		var searchTerm = menu.input;
		if (searchTerm && searchTerm.length > 0) {
			MenuSearchService.getMatchedMenuItems(searchTerm)
			.then(function(result) {
				menu.found = result;
				menu.showNothing = menu.found.length == 0;
			});
		} else {
			menu.found = [];
			menu.showNothing = true;
		}
	}

	menu.remove = function (index) {
		menu.found.splice(index, 1);
		menu.showNothing = menu.found.length == 0;
	}
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	var search = this;

	search.getMatchedMenuItems = function(searchTerm) {
		return $http({
				      method: 'GET',
				      url: (ApiBasePath + '/menu_items.json')
				    }).then(function (result) {
		      var foundItems = result.data.menu_items.filter(function (item) {
		      	return item.description.indexOf(searchTerm) >=0;
		      });
		      return foundItems;
		  });
	}
}

function FoundItemsDirectiveController() {
	var list = this;
}

})();
