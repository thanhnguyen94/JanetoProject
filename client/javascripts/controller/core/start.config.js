(function() {
    angular
        .module('app')
        .config(config)
        .factory('httpInterceptor', httpInterceptor);

    config.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider'];
    /* @ngInject */
    function config($httpProvider, $urlRouterProvider, $stateProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
        $urlRouterProvider.otherwise('/start');
        $stateProvider.state('start', {
            url: '/start',
            templateUrl: 'javascripts/controller/core/start.html',
            authenticate: true,
            controller: 'CoreController',
            controllerAs: 'vm',
            resolve: {
                checkAuth: function(authenticationService) {
                    return authenticationService.checkAuthentication();
                }
            }
        });

    }

    httpInterceptor.$inject = ['$q', '$location', '$localStorage', '$rootScope'];

    function httpInterceptor($q, $location, $localStorage, $rootScope) {

        return {
            request: function(_config) {
                if (_config.url.indexOf('.html') === -1 && _config.url.indexOf('http') === -1) {
                    _config.url = 'http://janeto.us.to:7555/' + _config.url;
                }
                if ($localStorage.token) {
                    _config.headers.authorization = $localStorage.token.token_type + ' ' + $localStorage.token.access_token;
                }
                return _config;
            },
            responseError: function(rejection) {
                if (rejection.status === 401 || rejection.status === 403 || rejection.status === 404 || rejection.status === 419) {
                    // Xu ly loi trong nay
                    return $q.reject(rejection);
                } else {
                    return $q.reject(rejection);
                }
            }
        };
    }
})();