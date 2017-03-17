

(function () {
    'use strict';

    angular.module('myra').controller("NotificationsController", NotificationsController);

    NotificationsController.$inject = ['Restangular','$state'];

    function NotificationsController(Restangular, $state) {
        var vm = this;
        var today = new Date();
        Restangular.all('api/customer').getList().then(function (res) {
            // vm.list = res.data;
            // vm.options.totalItems = parseInt(res.headers('total'));
            console.log(res.data[0].dob);
            console.log(res.data[0].annerversary);
            if(res.data[0].dob == today){
              vm.birthday = true;
            }
            if(res.data[0].annerversary == today){
              vm.annerversary = true;
            }
        });

    }

})();
