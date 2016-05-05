(function() {
    angular
        .module('app')
        .config(config)
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.in-charge-subject-list', {
            url: '/in-charge-subject-list/:teacherId',
            templateUrl: 'javascripts/controller/in-charge-subject-list/in-charge-subject-list.html',
            authenticate: true,
            controller: 'InChargeSubjectListController',
            controllerAs: 'vm'
        })
    }
})();
