(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('MyController', MyController);

MyController.$inject = ['$scope'];
function MyController($scope) {
  $scope.list = "";
  $scope.result = "";

  $scope.Check = function () {

    var countOfProduct = $scope.list.split(",").length;

    if (countOfProduct <= 3) {
      $scope.result ="Enjoy!";
    }
    else {
      $scope.result ="Too much!";
    }

  };
}

})();
