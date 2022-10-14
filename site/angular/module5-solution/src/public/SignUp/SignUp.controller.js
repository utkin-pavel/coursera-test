(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['SignUpService'];
function RegistrationController(SignUpService) {
  var reg = this;
  reg.completed = false;

  reg.submit = function () {
    reg.completed = true;

    var promise = SignUpService.getDetailOfCategory(reg.user);

    promise.then(function (response) {
      console.log(response.data);
      reg.status = response.status;

      if (reg.status == 200 ) {
        SignUpService.saveData(response.data, reg.user);
        reg.message = "Are you registered!";
      }

    })
    .catch(function (error) {
      console.log(error);
      reg.status = 500;
      reg.message = "This category is incorrect, please choose another"
    })

    //reg.status = SignUpService.gethttpStatus();
  //  console.log(category);

    //SignUpService.saveInfo(category, reg.user);
  };
}

})();
