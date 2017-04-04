

(function () {
    'use strict';

    angular.module('myra').controller("ReportsController", ReportsController);

    ReportsController.$inject = ['Restangular', '$state'];

    function ReportsController(Restangular, $state) {
        var vm = this;
        var d = new Date();
        vm.getFullYear = d.getFullYear();
        vm.months = ['January ', 'February ', 'March ', 'April ', 'May ', 'June ', 'July ', 'August ', 'September ', 'October ', 'November ', 'December '];

        vm.openCal = openCal;
        vm.openCal2 = openCal2;

        vm.filter = filter;
        vm.filter3 = filter3;

        vm.getCustomerList = getCustomerList;
        vm.customerChange = customerChange;

        vm.CustomerId = 0
        vm.collection = 0;
        vm.showtable = false;
        vm.showtable2 = false;
        vm.showtable3 = false;
        vm.showtable4 = false;
        vm.temp = true;

        vm.roles = [
            { id: 1, text: 'New' },
            { id: 2, text: 'Stitching' },
            { id: 3, text: 'Completed' },
            { id: 4, text: 'Cancelled' }
        ];

        vm.user = {
            roles: [1, 2, 3, 4]
        };

        vm.options = {
            pagesize: 10,
            totalItems: 0,
            page: 1,
            search: ''
        }

        vm.checkAll = function () {
            vm.user.roles = vm.roles.map(function (item) { return item.id; });
        };
        vm.uncheckAll = function () {
            vm.user.roles = [];
        };
        vm.checkUncheck = function (tmp) {
            if (tmp == true) vm.checkAll();
            else vm.uncheckAll();
        }

        vm.something = function () {
            vm.temp = false;
        }

        function filter3() {
            vm.showtable4 = true;

            if (vm.option3 == 'frequency') {
                vm.CustomerBasedReports = [];
                switch (vm.frequencyOption3) {
                    case 'today':

                        var startDate = new Date();
                        startDate.setHours(0, 0, 0, 0);
                        var endDate = new Date();
                        endDate.setHours(23, 0, 0, 0);

                        var newObj = { CustomerId: vm.custId, OrderStatusId: vm.user.roles, start: startDate, end: endDate };
                        Restangular.all('api/customerreport').post(newObj).then(function (res) {
                            res.data.forEach(function (element) {
                                element.OrderItems.forEach(function (ele) {
                                    vm.CustomerBasedReports.push(
                                        {
                                            id: element.id,
                                            name: element.Customer.name,
                                            Design: ele.Design.title,
                                            Style: ele.Style.title,
                                            OrderStatus: ele.OrderStatus.title,
                                            deliveryDate: ele.deliveryDate
                                        });
                                }, this);
                            }, this);
                        }, function (err) {
                            console.log(err);
                        });
                        break;
                    case 'week':
                        var startDate = new Date();
                        startDate.setDate(startDate.getDate() - 7);
                        startDate.setHours(0, 0, 0, 0);
                        var endDate = new Date();
                        endDate.setHours(0, 0, 0, 0);

                        var newObj = { CustomerId: vm.custId, OrderStatusId: vm.user.roles, start: startDate, end: endDate };
                        Restangular.all('api/customerreport').post(newObj).then(function (res) {
                            res.data.forEach(function (element) {
                                element.OrderItems.forEach(function (ele) {
                                    vm.CustomerBasedReports.push(
                                        {
                                            id: element.id,
                                            name: element.Customer.name,
                                            Design: ele.Design.title,
                                            Style: ele.Style.title,
                                            OrderStatus: ele.OrderStatus.title,
                                            deliveryDate: ele.deliveryDate
                                        });
                                }, this);
                            }, this);
                        }, function (err) {
                            console.log(err);
                        });
                        break;
                    case 'month':
                        var startDate = new Date();
                        startDate.setDate(startDate.getDate() - 30);
                        startDate.setHours(0, 0, 0, 0);
                        var endDate = new Date();
                        endDate.setHours(0, 0, 0, 0);

                        var newObj = { CustomerId: vm.custId, OrderStatusId: vm.user.roles, start: startDate, end: endDate };
                        Restangular.all('api/customerreport').post(newObj).then(function (res) {

                            res.data.forEach(function (element) {
                                element.OrderItems.forEach(function (ele) {
                                    vm.CustomerBasedReports.push(
                                        {
                                            id: element.id,
                                            name: element.Customer.name,
                                            Design: ele.Design.title,
                                            Style: ele.Style.title,
                                            OrderStatus: ele.OrderStatus.title,
                                            deliveryDate: ele.deliveryDate
                                        });
                                }, this);
                            }, this);
                        }, function (err) {
                            console.log(err);
                        });
                        break;
                    default:
                        break;
                }

            }
            else {
                vm.CustomerBasedReports = [];
                var newObj = { CustomerId: vm.custId, OrderStatusId: vm.user.roles, start: vm.datefrom3, end: vm.dateto3 };
                Restangular.all('api/customerreport').post(newObj).then(function (res) {
                    res.data.forEach(function (element) {
                        element.OrderItems.forEach(function (ele) {
                            vm.CustomerBasedReports.push(
                                {
                                    id: element.id,
                                    name: element.Customer.name,
                                    Design: ele.Design.title,
                                    Style: ele.Style.title,
                                    OrderStatus: ele.OrderStatus.title,
                                    deliveryDate: ele.deliveryDate
                                });
                        }, this);
                    }, this);
                }, function (err) {
                    console.log(err);
                });
            }

        }

        function getCustomerList() {
            Restangular.all('api/customer').getList().then(function (res) {
                vm.customers = res.data;
            });
        }

        function customerChange(custId) {
            vm.custId = custId;
        }

        function openCal() {
            vm.open_orderDate = !vm.open_orderDate;
        }

        function openCal2() {
            vm.open_orderDate2 = !vm.open_orderDate2;
        }

        function filter() {

            if (vm.option == 'frequency') {
                switch (vm.frequency) {
                    case 'today':
                        vm.showtable = false;
                        vm.showtable2 = true;
                        vm.showtable3 = false;

                        var startDate = new Date();
                        startDate.setHours(0, 0, 0, 0);
                        var endDate = new Date();
                        endDate.setHours(23, 0, 0, 0);

                        Restangular.all('api/report').post({ start: startDate, end: endDate }).then(function (res) {
                            console.log(res.data);
                            vm.records = res.data;
                        }, function (err) {
                            console.log(err);
                        });

                        break;
                    case 'week':
                        vm.showtable3 = false;
                        vm.showtable2 = false;
                        vm.showtable = true;

                        vm.records = [];
                        vm.array = [];

                        var startDate = new Date();
                        startDate.setDate(startDate.getDate() - 7);
                        var start = new Date();
                        start.setDate(start.getDate() - 7);
                        start.setHours(0, 0, 0, 0);
                        var endDate = new Date();
                        endDate.setHours(0, 0, 0, 0);

                        while (start < endDate) {
                            vm.array.push({ orderDate: start, totalamount: 0 })
                            var newDate = start.setDate(start.getDate() + 1);
                            start = new Date(newDate);

                        }

                        Restangular.all('api/report').post({ start: startDate, end: endDate }).then(function (res) {
                            res.data.forEach(function (element) {
                                var orderDate = new Date(element.orderDate);
                                orderDate.setHours(0, 0, 0, 0);

                                vm.array.push({ orderDate: orderDate, totalamount: element.totalamount });
                            }, this);
                            vm.array.reduce(function (res, value) {
                                if (!res[value.orderDate]) {
                                    res[value.orderDate] = {
                                        totalamount: 0,
                                        orderDate: value.orderDate
                                    };
                                    vm.records.push(res[value.orderDate])
                                }
                                res[value.orderDate].totalamount += value.totalamount
                                return res;
                            }, {});
                        }, function (err) {
                            console.log(err);
                        });



                        break;
                    case 'month':
                        vm.showtable3 = false;
                        vm.showtable2 = false;
                        vm.showtable = true;

                        vm.records = [];
                        vm.array = [];

                        var startDate = new Date();
                        startDate.setDate(startDate.getDate() - 30);
                        var start = new Date();
                        start.setDate(start.getDate() - 30);
                        start.setHours(0, 0, 0, 0);
                        var endDate = new Date();
                        endDate.setHours(0, 0, 0, 0);


                        while (start <= endDate) {
                            var newDate = start.setDate(start.getDate() + 1);
                            start = new Date(newDate);
                            vm.array.push({ orderDate: start, totalamount: 0 })
                        }

                        Restangular.all('api/report').post({ start: startDate, end: endDate }).then(function (res) {
                            res.data.forEach(function (element) {
                                var orderDate = new Date(element.orderDate);
                                orderDate.setHours(0, 0, 0, 0);

                                vm.array.push({ orderDate: orderDate, totalamount: element.totalamount });
                            }, this);
                            vm.array.reduce(function (res, value) {
                                if (!res[value.orderDate]) {
                                    res[value.orderDate] = {
                                        totalamount: 0,
                                        orderDate: value.orderDate
                                    };
                                    vm.records.push(res[value.orderDate])
                                }
                                res[value.orderDate].totalamount += value.totalamount
                                return res;
                            }, {});
                        }, function (err) {
                            console.log(err);
                        });

                        break;
                    case 'monthly':
                        vm.showtable3 = true;
                        vm.showtable2 = false;
                        vm.showtable = false;

                        vm.records = [];
                        vm.array = [];

                        var startDate = new Date();
                        startDate.setMonth(0);
                        startDate.setDate(1);
                        startDate.setHours(0, 0, 0, 0);

                        var endDate = new Date();
                        endDate.setMonth(11);
                        endDate.setDate(31);
                        endDate.setHours(0, 0, 0, 0);

                        for (var index = 1; index <= 12; index++) {
                            vm.array.push({ createdat: "0" + index, val: 0 });
                        }

                        Restangular.all('api/report').post({ start: startDate, end: endDate }).then(function (res) {
                            var groupedByDateData = _.groupBy(res.data, function (date) {
                                return date.createdAt.substring(5, 7);
                            });



                            vm.aggregateByDate = _.map(groupedByDateData, function (invoiceObject, createdat) {
                                return {
                                    createdat: createdat,
                                    val: _.reduce(invoiceObject, function (m, x) {
                                        return m + x.totalamount;
                                    }, 0)
                                };
                            });

                            vm.array.push(vm.aggregateByDate[0]);

                            vm.array.reduce(function (res, value) {
                                if (!res[value.createdat]) {
                                    res[value.createdat] = {
                                        val: 0,
                                        createdat: value.createdat
                                    };
                                    vm.records.push(res[value.createdat])
                                }
                                res[value.createdat].val += value.val
                                return res;
                            }, {});
                        }, function (err) {
                            console.log(err);
                        });

                        break;
                    default:
                        break;
                }
            }

            else {
                if (vm.datefrom && vm.dateto) {
                    vm.showtable = true;
                    vm.showtable2 = false;
                    vm.showtable3 = false;
                    vm.error = '';

                    vm.records = [];
                    vm.array = [];

                    var startDate = new Date(vm.datefrom);
                    startDate.setHours(0, 0, 0, 0);

                    var start = startDate;
                    start.setDate(start.getDate() - 2);

                    var endDate = new Date(vm.dateto);
                    endDate.setHours(0, 0, 0, 0);

                    while (start < endDate) {
                        var newDate = start.setDate(start.getDate() + 1);
                        start = new Date(newDate);
                        vm.array.push({ orderDate: start, totalamount: 0, id: '-' })
                    }

                    Restangular.all('api/customerreport').post({ CustomerId: vm.custId, OrderStatusId: 1, start: startDate, end: endDate }).then(function (res) {
                        res.data.forEach(function (element) {
                            var orderDate = new Date(element.orderDate);
                            orderDate.setHours(0, 0, 0, 0);

                            vm.array.push({ orderDate: orderDate, totalamount: element.totalamount, id: element.id });
                        }, this);
                        vm.array.reduce(function (res, value) {
                            if (!res[value.orderDate]) {
                                res[value.orderDate] = {
                                    totalamount: 0,
                                    orderDate: value.orderDate,
                                    id: value.id
                                };
                                vm.records.push(res[value.orderDate])
                            }
                            res[value.orderDate].totalamount += value.totalamount
                            return res;
                        }, {});
                    }, function (err) {
                        console.log(err);
                    });
                }
                else {
                    vm.error = "Please Select Date Range.";
                }
            }
        }
    }

})();
