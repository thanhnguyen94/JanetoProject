(function() {
    angular
        .module('app')
        .config(config)

    config.$inject = ['$stateProvider'];
    / @ngInject /
    function config($stateProvider) {
        $stateProvider.state('start.teacher-edit', {
            url: '/teacher-edit/{id}',
            templateUrl: 'javascripts/controller/teacher-edit/teacher-edit.html',
            controller: 'TeacherEditController',
            controllerAs: 'vm'
        });
    }
})();
