(function() {
    angular
        .module('app')
        .controller('CoreController', CoreController);

    CoreController.$inject = ['$state', 'authenticationService','$localStorage'];

    /* @ngInject */
    function CoreController($state, authenticationService, $localStorage) {
        var vm = this;
        vm.menuStatus = false;
        vm.searchStatus = false;
        vm.menuClick = menuClick;
        vm.searchClick = searchClick;
        vm.searchContent = '';
        vm.logout = logout;
        vm.activeMenu = activeMenu;
        vm.removeActiveMenu = removeActiveMenu;
        vm.changeSelectedElementMenu = changeSelectedElementMenu;
        vm.selectedElementMenu = 0;
        vm.nameClass = '';
        vm.menuIcon = ['glyphicon glyphicon-home',
            'glyphicon glyphicon-queen', 'glyphicon glyphicon-knight', 'glyphicon glyphicon-queen',
            'glyphicon glyphicon-book', 'glyphicon glyphicon-book', 'fa fa-pencil-square-o'
        ];
        vm.menuName = ['Home', 'Teacher', 'Student',
            'Subject', 'Approved Subject List', 'Create Subject By Admin', 'Update profile'
        ];
        vm.menuRef = ['start', 'start.teacher-list', 'start', 'start.subject-list',
            'start.subject-approve', 'start.create-subject-admin', 'start.teacher-edit'
        ];
        vm.active = ['active'];

        while (vm.active.length < vm.menuRef.length) {
            vm.active.push('');
        }

        function activeMenu(menuIndex) {           
            vm.active[menuIndex] = 'active';
        }

        function removeActiveMenu(menuIndex) {
            for (var i = 0; i < vm.active.length; i++) {
                if (vm.active[i] == 'active' && i != vm.selectedElementMenu) {
                    vm.active[i] = '';
                }
            }
        }

        function changeSelectedElementMenu(menuIndex) {
            vm.active[vm.selectedElementMenu] = '';
            vm.selectedElementMenu = menuIndex;
            vm.active[vm.selectedElementMenu] = 'active';
        }

        function menuClick() {
            vm.menuStatus = !vm.menuStatus;
        }

        function searchClick() {
            vm.searchStatus = !vm.searchStatus;
        }
        
        function logout() {
            delete $localStorage.token;
            $state.go('login');
        }
    }
})();
