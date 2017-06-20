  (function() {
    'use strict';
    angular.module('myra').controller('CustomerController', CustomerController);

    CustomerController.$inject = ['Restangular', '$state', 'SweetAlert', '$stateParams'];

    function CustomerController(Restangular, $state, SweetAlert, $stateParams) {
      var vm = this;
      vm.role=window.user.userrole;



      vm.list = [];
      vm.save = save;
      vm.edit = edit;
      vm.getList = getList;
      vm.activate = activate;
      vm.search = search;
      vm.order = order;
      vm.pageChange = pageChange;
      vm.orderDetail = orderDetail;
      vm.getUserDetail = getUserDetail;
      vm.userDetail = [];
      vm.FilteredList = [];
      vm.options = {
        pagesize: 10,
        totalItems: 0,
        page: 1,
        search: ''
      }
      vm.today = new Date();
      vm.retData = retData;
      //vm.getMeasurementList = getMeasurementList;

      function edit(obj) {
        $state.go('secure.edit-customer', {
          id: obj.id
        });
      }

      function retData() {
        vm.list.forEac

      (function(obj) {
          if (obj.createdBy.username === vm.search.username.trim()) {
            vm.FilteredList.push(obj)
          }
        });
      }

      function orderDetail(obj) {
        $state.go('secure.customer-order-detail', {
          customerId: obj.id
        });
      }

      function save(form) {
        if (form.$invalid) {
          _.forEach(form.$error.required, function(frm) {
            frm.$setDirty();
          });
          vm.isSubmitted = true;
          return;
        }
        vm.startProcessing = true;
        if (!vm.customer.id) {
          Restangular.all('api/customer/' + window.user.id).post(vm.customer).then(function(res) {
            SweetAlert.swal("Customer saved successfully!");
            $state.go('secure.customer');
          }, function(err) {
            console.log(err);
            vm.error = err.data.message;
            vm.startProcessing = false;
          });
        } else {
          Restangular.one('api/customer/' + vm.customer.id).patch(vm.customer).then(function(res) {
            SweetAlert.swal("Customer updated successfully!");
            $state.go('secure.customer');
          }, function(err) {
            console.log(err);
            vm.error = err.data.message;
            vm.startProcessing = false;
          });
        }
      }

      function getList() {

        var id = window.user.id;
        Restangular.all('api/getDetail/' + id).getList(vm.options).then(function(res) {
          vm.list = res.data;


          vm.options.totalItems = parseInt(res.headers('total'));
        });
      }
      //function getMeasurementList() {
      //    Restangular.all('api/measurement').getList().then(function (res) {
      //        vm.mesaurements = res;
      //        vm.mesaurements = _.filter(vm.mesaurements, ['isActive', true]);
      //    });
      //}


      function pageChange() {
        getList();
      }

      function search() {
        vm.options.page = 1;
        vm.options.where = 'name;$like|s|%' + vm.options.search + '%';
        getList();
      }

      function order(col, ord) {
        vm.asc = !vm.asc;
        var ascL = vm.asc ? 'asc' : 'desc';
        vm.options.sort = col + ' ' + ascL;
        vm.options.page = 1;
        getList();
      }

      function getUserDetail() {
        // console.log("we are in......................");
        Restangular.all('api/userDetail').getList().then(function(res) {
          vm.userDetail = res.data;
        
          // console.log("userDetail:::::::::::::::" + JSON.stringify(res.data));
        });
      }

      function getUserList(Userid) {


         var id = Userid;
        Restangular.all('api/getDetail/' + id).getList(vm.options).then(function(res) {

          vm.list = res.data;
        });
      }

      function activate() {



        Restangular.all('api/measurement').getList().then(function(res) {
          vm.mesaurements = res.data;


          vm.customer = {
            CustomerMeasurements: []
          };
          var arr = [];
          _.forEach(vm.mesaurements, function(msr) {
            if (msr.isActive) {
              arr.push({
                val: '',
                MeasurementId: msr.id,
                Measurement: msr
              });
            }
          });
          if ($stateParams.id != 'new') {

            Restangular.one('api/customer/' + $stateParams.id).get().then(function(res) {
              vm.customer = res.data;
              vm.customer.dob = new Date(vm.customer.dob);
              vm.customer.annerversary = new Date(vm.customer.annerversary);

              _.forEach(arr, function(msr) {
                //check for value for user
                var chk = _.find(vm.customer.CustomerMeasurements, ['MeasurementId', msr.MeasurementId]);
                if (chk) {
                  msr.val = chk.val;
                }
              });
              vm.customer.CustomerMeasurements = vm.customer.CustomerMeasurements || [];
              vm.customer.CustomerMeasurements = arr;
            });
          } else {
            vm.customer.CustomerMeasurements = arr;
          }

        });


      }
      vm.getUserDetail();
    }

  })();
