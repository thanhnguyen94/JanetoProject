(function() {
    angular.module('app', [
        'ui.router',
        'ngStorage',
        'ui.bootstrap',
        'ui.select',
        'ngSanitize'
    ]).run(init);

    init.$inject = ['$rootScope', 'authenticationService', '$localStorage', '$state'];

    function init($rootScope, authenticationService, $localStorage, $state) {

        function stateChangeStart(event, toState, toParams, fromState) {
            // if (toState.name !== fromState.name) {
            //     if (!$localStorage.token) {
            //         if (toState.authenticate === true) {
            //             $state.go('login');
            //         }
            //     }
            // } else {
            //     if (!toState.authenticate && fromState.authenticate) {
            //         event.preventDefault();
            //     }
            // }
        }

        function stateChangeSuccess() {

        }
        $rootScope.$on('$stateChangeStart', stateChangeStart);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    }
})();