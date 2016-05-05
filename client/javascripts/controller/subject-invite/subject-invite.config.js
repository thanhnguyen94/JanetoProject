(function() {
    angular
        .module('app')
        .config(config)

    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.subject-invite', {
            url: '/subject-invite',
            templateUrl: 'javascripts/controller/subject-invite/subject-invite.html',
            authenticate: true,
            controller: 'InvitedSubjectController',
            controllerAs: 'vm'
        });
    }
})();
