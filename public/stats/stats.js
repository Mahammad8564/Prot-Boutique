

(function () {
    'use strict';

    angular.module('myra').controller("StatsController", StatsController);

    StatsController.$inject = ['Restangular', '$state'];

    function StatsController(Restangular, $state) {
        var vm = this;
        vm.newOrders = 0;
        vm.stitchingOrders = 0;
        vm.completedOrders = 0;
        vm.cancelledOrders = 0;
        var DesignIds = [];
        var StyleIds = [];
        var DesignIdsStyleIds = [];

        vm.getList = getList;
        function getList() {
            Restangular.all('api/customer').getList(vm.options).then(function (res) {
                vm.totalCustomers = res.data.length;
            });

            Restangular.all('api/notify').getList(vm.options).then(function (res) {
                console.log(res.data);
                res.data.forEach(function (element) {
                    DesignIds.push(element.Design.title);
                    StyleIds.push(element.Style.title);
                    DesignIdsStyleIds.push(element.Design.title+element.Style.title);
                }, this);

                var newDesignId = DesignIds.slice().sort(), most = [undefined, 0], counter = 0;
                var newStyleId = StyleIds.slice().sort(), most1 = [undefined, 0], counter = 0;
                var DesignIdsStyleId = DesignIdsStyleIds.slice().sort(), most2 = [undefined, 0], counter = 0;

                newDesignId.reduce(function (old, chr) {
                    old == chr ? ++counter > most[1] && (most = [chr, counter]) : (counter = 1)
                    return chr
                });
                newStyleId.reduce(function (old, chr) {
                    old == chr ? ++counter > most1[1] && (most1 = [chr, counter]) : (counter = 1)
                    return chr
                });
                DesignIdsStyleId.reduce(function (old, chr) {
                    old == chr ? ++counter > most2[1] && (most2 = [chr, counter]) : (counter = 1)
                    return chr
                });

                vm.bestDesign = most[0];
                vm.bestStyle = most1[0];
                vm.bestCombo = most2[0];
            });

            Restangular.all('api/order').getList(vm.options).then(function (res) {
                console.log(res);
                vm.totalOrders = res.data.length;
                res.data.forEach(function (element) {
                    if (element.OrderStatusId == 1) {
                        vm.newOrders++;
                    }
                    if (element.OrderStatusId == 2) {
                        vm.stitchingOrders++;
                    }
                    if (element.OrderStatusId == 3) {
                        vm.completedOrders++;
                    }
                    if (element.OrderStatusId == 4) {
                        vm.cancelledOrders++;
                    }
                }, this);
            });
        }

    }

})();
