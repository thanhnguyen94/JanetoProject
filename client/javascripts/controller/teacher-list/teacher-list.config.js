(function() {
    angular
        .module('app')
        .config(config)
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.teacher-list', {
            url: '/teacher-list',
            templateUrl: 'javascripts/controller/teacher-list/teacher-list.html',
            authenticate: true,
            controller: 'ListTeacherController',
            controllerAs: 'vm'
        })
    }
})();