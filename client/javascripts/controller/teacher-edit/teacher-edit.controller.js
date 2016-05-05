(function() {
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('app')
        .controller('TeacherEditController', TeacherEditController);

    TeacherEditController.$inject = ['$http','$scope','$rootScope','teacherService','$state','$stateParams'];

    function TeacherEditController($http, $scope, $rootScope, teacherService, $state, $stateParams) {
        var vm               = this;
        vm.Teacher = {};
        vm.Teacher.Id = "";
        vm.Teacher.Email ="";
        vm.Teacher.UserName ="";
        // vm.Teacher.Password ="";
        vm.Teacher.FirstName ="";
        vm.Teacher.LastName ="";
        vm.Teacher.PhoneNumber ="";
        // vm.Teacher.repass ="";
        vm.putTeacher        = putTeacher;

        vm.Teachers = [];
        vm.teacherData =[] ;
        vm.tempTeacher = {};

        // vm.tempTeacher = $rootScope.tempTeacher;

        // teacherService.getTeacher()
        //     .success(function (data){
        //         vm.teacherData = data.Data;
        //         for(var i = 0 ; i < vm.teacherData.length ; i++){
        //             var ID = vm.teacherData[i].Id;
        //             if($stateParams.id == ID){
        //                     vm.Teacher = vm.teacherData[i];
        //                    break;
        //             }
        //         }
        //         console.log(vm.teacherData);
        //     });

        teacherService.getProfile()
            .success(function(data){
                console.log(data);
                vm.Teacher = data;
            });

        function putTeacher(teacher){
            console.log(teacher);
            vm.Teacher = teacher;
            delete vm.Teacher.UserName;
            delete vm.Teacher.Email;
            delete vm.Teacher.Roles;
            teacherService.editTeacher(vm.Teacher);
        }
    }
})();
