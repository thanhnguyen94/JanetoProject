
(function() {
    angular
        .module('app')
        .controller('InChargeSubjectListController', InChargeSubjectListController) ;


    InChargeSubjectListController.$inject = ['$scope','$http' , '$stateParams' ,'$http' , 'popupService'];

    function InChargeSubjectListController($scope, $http , $stateParams , $http , popupService ) {
        var vm = this;
        vm.teacherId = $stateParams.teacherId ;
        vm.subjectList = '' ;
        vm.headerTable =[] ;
        vm.bodyTable = [] ;
        vm.actionLeaveArray =[] ;
        vm.customDeleteName = 'Leave' ;
        vm.customEditName = 'null' ;

        // let getProfileURL = "http://janeto.us.to:7555/api/Accounts/GetProfile" ; 
        // $http.get(getProfileURL ,  { 
        //     headers : { 'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiIwMzk4ZDdjZC1kMDUyLTQwZGItOTUyOS05ZDU2MzIwMmFlMTciLCJ1bmlxdWVfbmFtZSI6IlRlYWNoZXJOaW5oMTIzNEAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI3NDc5NjlhNS0yYTlkLTQwNzUtYTNmZi0yMzc3ZDUwMzdiMzUiLCJyb2xlIjoiVGVhY2hlciIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTc0NTMiLCJhdWQiOiIwOTkxNTNjMjYyNTE0OWJjOGVjYjNlODVlMDNmMDAyMiIsImV4cCI6MTQ2MTcyNDc0OCwibmJmIjoxNDYxNjM4MzQ4fQ.JXe6vxF483dgCpm1DqrMuj3muVw-DA_R2aHNNWr6uM0'}
        // }).then( function success(data) {
        //   console.log(data) ; 
        // }) ;


        let url  = "http://janeto.us.to:7555/api/Subjects/GetByTeacher?teacherId=" + vm.teacherId ; 
        $http.get(url).then(function (response) {
            vm.subjectList = response.data ;
        } , function (error) {
            vm.subjectList = null ;
        }) ;

        $scope.$watch('vm.subjectList' , function (value) {
            if(vm.subjectList) {
                renderSubjectList() ;
            }
        }) ;

        function renderSubjectList() {
            vm.headerTable = ['ID' , 'Name' ,  'Description' , 'Approved'] ;
            vm.bodyTable = vm.subjectList ;

            vm.bodyTable.forEach( function(data) {
                var leaveFunction = function() {
                    popupService.showPopup() ;
                    popupService.popup.funcBtnOK = function () {
                        console.log("Hello OK function") ; // update later after haver API
                        popupService.closePopup() ;
                    }
                } ;
                vm.actionLeaveArray.push(leaveFunction) ;
            }) ;


        }


    }
})();

