(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  list1.itemsToBuy = ShoppingListCheckOffService.getDefaultItems();

  list1.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.itemsBought = ShoppingListCheckOffService.getBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [];
  var itemsBought = [];

  service.removeItem = function (itemIndex) {

      var item = {
        name: itemsToBuy[itemIndex].name,
        quantity: itemsToBuy[itemIndex].quantity
      };


      itemsToBuy.splice(itemIndex,1);
      itemsBought.push(item);

  };

  service.getBought = function () {
    itemsBought = []
    return itemsBought;
  };

  service.addItem = function (itemIndex) {
    console.log(itemIndex);
  };

  service.getDefaultItems = function () {

    itemsToBuy = [{
    name: "Milk",
    quantity: "22"
    },
    {
    name: "Meat",
    quantity: "200"
    },
    {
    name: "Chicken",
    quantity: "300"
    },
    {
    name: "Chocolate",
    quantity: "5"
    },

    {
    name: "Bananas",
    quantity: "15"
    },

    {
    name: "Apples",
    quantity: "25"
    }
    ];
    return itemsToBuy;
  };
}

})();
