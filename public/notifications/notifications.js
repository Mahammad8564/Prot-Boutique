

(function () {
    'use strict';

    angular.module('myra').controller("NotificationsController", NotificationsController);

    NotificationsController.$inject = ['Restangular','$state'];

    function NotificationsController(Restangular, $state) {
        var vm = this;
        var today = new Date();
        vm.birthday = [];
        vm.annerversary = [];

        Restangular.all('api/notify').getList().then(function (res) {

          for (var i = 0; i < res.data.length; i++) {
            var dob = new Date(res.data[i].dob);
            var annerversary = new Date(res.data[i].annerversary);
            if(dob.getMonth() == today.getMonth() && dob.getDate() == today.getDate()){
              vm.birthday.push(res.data[i]);
            }
            if(annerversary.getMonth() == today.getMonth() && annerversary.getDate() == today.getDate()){
              vm.annerversary.push(res.data[i]);
            }
          }
        });
    }

})();
