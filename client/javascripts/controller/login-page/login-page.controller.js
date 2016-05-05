(function() {
    angular.module('app')
        .controller('loginPageController', loginPageController);

    loginPageController.$inject = ['$location', 'authenticationService', '$localStorage', '$state'];


    function loginPageController($location, authenticationService, $localStorage, $state) {
        var vm = this;
        vm.username;
        vm.password;
		vm.warning = {};
        vm.login = login;
        vm.message = "if you don't have an account. Please regist!";

        function login() {
            var data = {
                username: vm.username,
                password: vm.password,
                grant_type: 'password'
            };

            authenticationService.getToken(data).then(function(res) {
                if (res.status === 200) {
                    $localStorage.token = res.data;
                    $state.go('start');
                } else if (res.status === 400) {
                    vm.message = res.data.error_description;
					vm.warning = {
						color: 'red'
					}
                }
            });

        };
    }
})();