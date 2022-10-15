(function () {
'use strict';

angular.module('public')
.constant('ApiBasePath', "https://utkin-pavel02.herokuapp.com/menu_items/")
.service('SignUpService', SignUpService);

SignUpService.$inject = ['$q', '$timeout', 'ApiBasePath', '$http']
function SignUpService($q, $timeout, ApiBasePath, $http, category) {
  var service = this;
  var isreg = false;
  var user = {};
  var status = "000";

  service.saveData = function (category, userV) {
      user = userV;
      user.favCategory = category;
      service.isreg  = true;
  }

  service.getInfo = function () {
      return user;
  };

  service.gethttpStatus = function () {
      return service.status;
  };

  service.getStatus = function () {
      return service.isreg;
  };

service.getDetailOfCategory = function (userV) {
    var response = $http({
       method: "GET",
       url: (ApiBasePath + userV.category.touppercase() + ".json")
    });

    return response;


  //   var deferred = $q.defer();
  //
  //   $http ({
  //     method: "GET",
  //     url: (ApiBasePath + userV.category + ".json")}
  //   ).
  //   then(function(response) {
  //      user = userV;
  //      user.favCategory = response.data;
  //      service.isreg = true;
  //      service.status = response.status;
  //      deferred.resolve(response.data);
  //   }, function (response) {
  //
  //      service.status = response.status;
  //   }
  // )
  //
  //   return deferred.promise;
  };

}

})();
