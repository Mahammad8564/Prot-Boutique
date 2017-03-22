

(function () {
    'use strict';

    angular.module('myra').controller("ReportsController", ReportsController);

    ReportsController.$inject = ['Restangular', '$state'];

    function ReportsController(Restangular, $state) {
        var vm = this;
        vm.getCustomerList = getCustomerList;
        vm.customerChange = customerChange;
        vm.openCal = openCal;
        vm.openCal2 = openCal2;

        function openCal() {
                vm.open_orderDate = !vm.open_orderDate;
        }

        function openCal2() {
                vm.open_orderDate2 = !vm.open_orderDate2;
        }

        function getCustomerList() {
            Restangular.all('api/customer').getList().then(function (res) {
                vm.customers = res.data;
            });
        }

        function customerChange(custId) {
            var cust = _.find(vm.customers, ['id', parseInt(custId)]);
            if (cust) {
                vm.order.Customer = {
                    address: cust.address,
                    mobile: cust.mobile
                }
            }
            else {
                vm.order.Customer = {
                    address: '',
                    mobile: ''
                }
            }
        }

    }

})();
