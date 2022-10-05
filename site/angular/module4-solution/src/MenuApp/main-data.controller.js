(function () {
'use strict';

angular.module('Data')
.controller('DataController', DataController);

DataController.$inject = ['DataService', 'items0'];
function DataController(DataService, items0) {
  var main = this;
  main.items0 = items0;
}

})();
