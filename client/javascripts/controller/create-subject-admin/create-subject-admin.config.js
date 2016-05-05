(function() {
    angular
        .module('app')
        .config(config)

    config.$inject = ['$stateProvider'];
    / @ngInject /
    function config($stateProvider) {
        $stateProvider.state('start.create-subject-admin', {
            url: '/create-subject-admin',
            templateUrl: 'javascripts/controller/create-subject-admin/create-subject-admin.html',
            controller: 'CreateSubjectAdminController',
            controllerAs: 'vm'
        });
    }
})();