(function () {
    angular
        .module('app')
        .controller('CreateSubjectController', CreateSubjectController)


    CreateSubjectController.$inject = ['$scope', '$http', '$state'];

    function CreateSubjectController($scope, $http, $state) {
        var vm = this;
        vm.data = { Name: vm.subjectName, Description: vm.description };
        vm.submit = submit;
        vm.successCallBack = successCallBack;
        vm.errorCallBack = errorCallBack;
        function submit() {
           return $http.post('api/Requests/CreateSubject', vm.data).then(vm.successCallback, vm.errorCallback);
        }

        function successCallBack(response) {
            console.log("done");
            $state.go('start.subject-list');
            
        }
        function errorCallBack(error) {
            console.log("fail");
            $state.go('start.subject-list');
        }

    }
})();