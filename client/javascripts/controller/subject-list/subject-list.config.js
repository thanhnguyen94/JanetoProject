(function() {
    angular
        .module('app')
        .config(config)
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.subject-list', {
            url: '/subject-list',
            templateUrl: 'javascripts/controller/subject-list/subject-list.html',
            authenticate: true,
            controller: 'ListSubjectController',
            controllerAs: 'vm'
        })
    }

})();
