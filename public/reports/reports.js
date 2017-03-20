

(function () {
    'use strict';

    angular.module('myra').controller("ReportsController", ReportsController);

    ReportsController.$inject = ['Restangular','$state'];

    function ReportsController(Restangular, $state) {
        var vm = this;
        vm.getList = getList;
        function getList() {
            Restangular.all('api/customer').getList(vm.options).then(function (res) {
                vm.totalCustomers = res.data.length;
            });
            Restangular.all('api/order').getList(vm.options).then(function (res) {
                vm.totalOrders = res.data.length;
            });
        }

    }

})();
