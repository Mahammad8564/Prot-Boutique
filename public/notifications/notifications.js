

(function () {
    'use strict';

    angular.module('myra').controller("NotificationsController", NotificationsController);

    NotificationsController.$inject = ['Restangular','$state'];

    function NotificationsController(Restangular, $state) {
        var vm = this;
        vm.openCal = openCal;
        function openCal() {
            // if (!vm.order.id)
                vm.open_orderDate = !vm.open_orderDate;
                Restangular.all('api/notify').getList().then(function (res) {

                  for (var i = 0; i < res.data.length; i++) {
                    var dob = new Date(res.data[i].dob);
                    var annerversary = new Date(res.data[i].annerversary);
                    if(dob.getMonth() == vm.today.getMonth() && dob.getDate() == vm.today.getDate()){
                      vm.birthday.push(res.data[i]);
                    }
                    if(annerversary.getMonth() == vm.today.getMonth() && annerversary.getDate() == vm.today.getDate()){
                      vm.annerversary.push(res.data[i]);
                    }
                    console.log(vm.birthday);
                    console.log(vm.annerversary);
                  }
                });
        }
        vm.today = new Date();
        vm.birthday = [];
        vm.annerversary = [];


    }

})();
