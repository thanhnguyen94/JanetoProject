(function() {
    angular
        .module('app')
        .config(config)

    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.subject-approve', {
            url: '/subject-approve',
            templateUrl: 'javascripts/controller/subject-approve/subject-approve.html',
            authenticate: true,
            controller: 'ApprovedSubjectController',
            controllerAs: 'vm'
        });
    }
})();
