(function () {
'use strict';

angular.module('Data')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['DataService', 'items1'];
function ItemDetailController(DataService, items1) {
  var main = this;
  main.items1 = items1;
}

})();
