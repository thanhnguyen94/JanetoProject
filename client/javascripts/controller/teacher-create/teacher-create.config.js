(function() {
    angular
        .module('app')
        .config(config)
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.teacher-create', {
            url: '/teacher-create',
            templateUrl: 'javascripts/controller/teacher-create/teacher-create.html',
            authenticate: true,
            controller: 'CreateTeacherController',
            controllerAs: 'vm',
            resolve: {
                checkAuth: function(authenticationService) {
                    return authenticationService.checkAuthentication();
                }
            }
        })
    }
})();
