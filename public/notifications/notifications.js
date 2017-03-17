

(function () {
    'use strict';

    angular.module('myra').controller("NotificationsController", NotificationsController);

    NotificationsController.$inject = ['Restangular','$state'];

    function NotificationsController(Restangular, $state) {
        var vm = this;
    }

})();
