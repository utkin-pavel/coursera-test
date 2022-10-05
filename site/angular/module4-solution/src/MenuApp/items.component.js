(function () {
'use strict';

angular.module('Data')
.component('newList', {
  templateUrl: 'src/MenuApp/templates/item-detail.template.html',
  bindings: {
    items1: '<'
  }
});

})();
