(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$urlRouterProvider', '$stateProvider'];
    /* @ngInject */

    function config($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/start');

        $stateProvider
            .state('forgot-password', {
                url: '/forgot-password',
                templateUrl: 'javascripts/controller/forgot-password/forgot-password.html',
                authenticate: false,
                controller: 'ForgotPasswordController',
                controllerAs: 'vm',
                resolve: {
                    checkAutho: function(authenticationService) {
                        return authenticationService.checkUnAuthentication();
                    }
                }
            })
            .state('forgot-password-success', {
                url: '/forgot-password-success',
                templateUrl: 'javascripts/controller/forgot-password/forgot-password.success.html',
                authenticate: false,
                controller: 'ForgotPasswordController',
                controllerAs: 'vm',
                resolve: {
                    checkAutho: function(authenticationService) {
                        return authenticationService.checkUnAuthentication();
                    }
                }
            })
            .state('create-new-password', {
                url: '/create-new-password',
                templateUrl: 'javascripts/controller/forgot-password/forgot-password-create-new-password.html',
                authenticate: false,
                controller: 'CreateNewPasswordController',
                controllerAs: 'vm',
                resolve: {
                    checkAutho: function(authenticationService) {
                        return authenticationService.checkUnAuthentication();
                    }
                }
            });
    }

})();