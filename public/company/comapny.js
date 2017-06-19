(function() {
  'use strict';

  angular.module('myra').controller('CompanyController', CompanyController);

  CompanyController.$inject = ['Restangular', '$state', 'SweetAlert', '$stateParams', 'Upload'];

  function companyController(Restangular, $state, SweetAlert, $stateParams, Upload) {
    var vm = this;
vm.getList=getList;

    function getList() {
      id=1;
      
      Restangular.all('api/company/'+id).getList().then(function(res) {
        vm.list = res.data;
        vm.options.totalItems = parseInt(res.headers('total'));
      });
    }
vm.getList()


  }

})();
