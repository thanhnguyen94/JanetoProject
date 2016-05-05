(function () {
    angular
        .module('app')
        .config(config)
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.subject-create', {
            url: '/subject-create',
            templateUrl: 'javascripts/controller/teacher-create-subject/teacher-create-subject.html',
            authenticate: true,
            controller: 'CreateSubjectController',
            controllerAs: 'vm'
        })
    }
})();