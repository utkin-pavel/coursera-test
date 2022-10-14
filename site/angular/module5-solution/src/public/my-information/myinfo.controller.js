(function () {
"use strict";

angular.module('public')
.controller('MyInfoCtrl', MyInfoCtrl);


MyInfoCtrl.$inject = ['SignUpService', 'ApiPath'];
function MyInfoCtrl(SignUpService, ApiPath) {
  var myinfo = this;

  myinfo.user = SignUpService.getInfo();
  myinfo.basePath = ApiPath;
  myinfo.isreg = SignUpService.getStatus();
}

})();
