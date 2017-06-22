(function() {
  'use strict';
  angular.module('myra').controller('companyController', companyController);

  companyController.$inject = ['Restangular', '$state', '$stateParams'];



  function companyController(Restangular, $state, $stateParams) {
    var vm = this;
    vm.list = [];



    vm.open = open;
    vm.addCompanyDetail = addCompanyDetail;
    vm.getCompanyDetail = getCompanyDetail;
    vm.company={
      isActive:true
    };


    function addCompanyDetail(form) {
    
      console.log("name i m innnnnnn");
      Restangular.all('api/company').post(vm.company).then(function(res) {
        console.log("sucess is hereeeeeeeeeeeeee");
        $state.go('secure.company');

      }, function(err) {
        console.log(err);
        vm.error = err.data.message;
        vm.startProcessing = false;
      });
    }


    function getCompanyDetail() {

      Restangular.all('api/company').getList().then(function(res) {
        vm.list = res.data;

      }, function(err) {
        console.log(err);
        vm.error = err.data.message;
        vm.startProcessing = false;
      });
    }






  }
})();
