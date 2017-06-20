

(function () {
    'use strict';

    angular.module('myra').controller("LoginController", LoginController);

    LoginController.$inject = ['Restangular','$state'];

    function LoginController(Restangular, $state) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.loginBtnText = 'Login';

        function login(form) {
          console.log("log che bhai"+JSON.stringify(vm.user));
            vm.loginBtnText = 'Login';
            if (form.$invalid) {
                _.forEach(form.$error.required, function (frm) {
                    frm.$setDirty();
                });
                vm.isSubmitted = true;
                return;
            }
            vm.startProcessing = true;
            vm.loginBtnText = 'Loging In...';
            Restangular.all('signin').post(vm.user).then(function (res) {
                if (res.data.message) {
                  console.log("USER dtaa.message::::");

                    vm.error = res.data.message;
                    vm.startProcessing = false;
                    vm.loginBtnText = 'Login';
                } else {
                  console.log("USER dtaa::::"+JSON.stringify(res.data));
                    window.user = res.data;
                    window.location.reload();
                }
            }, function (err) {
                vm.error = err.data.message;
                vm.startProcessing = false;
                vm.loginBtnText = 'Login';
            });
        }

        function logout() {
            delete window.user;
            $state.go('home');
        }
    }

})();
