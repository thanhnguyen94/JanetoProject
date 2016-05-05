
(function() {
    angular
        .module('app')
        .controller('CreateTeacherController', CreateTeacherController)


    CreateTeacherController.$inject = ['$scope','$http','teacherService', '$state'];

    function CreateTeacherController($scope, $http, teacherService, $state) {
        var vm = this ; 
        vm.Teacher = {};
        vm.Teacher.UserName = "";
        vm.Teacher.Email = "";
        vm.Teacher.Password = "";
        
        vm.addTeacher = addTeacher;
        vm.teacherData = {};

         
        function addTeacher() {
            vm.Teacher.UserName = vm.username;
            vm.Teacher.Email = vm.email;
            vm.Teacher.Password = vm.password;
            teacherService.CreateTeacher(vm.Teacher);
            event.preventDefault();
            event.stopPropagation();
            vm.username = "";
            vm.email = "";
            vm.password="";
            vm.Teacher = {};
                       
        };
        vm.password = generatePassword(8);
        function generatePassword(length){
            var chars1 = "abcdefghijklmnopqrstuvwxyz";
            var chars2 = "!@#$%^&*";
            var chars3 = "ABCDEFGHIJKLMNOPQRSTUVWZYZ";
            var chars4 = "1234567890";
            var chars5 = "abcdefghijklmnopqrstuvwxyz!@#$%^&*ABCDEFGHIJKLMNOP1234567890";
            var pass = "";
            pass += chars1[Math.floor(Math.random() * chars1.length)];
            pass += chars2[Math.floor(Math.random() * chars2.length)];
            pass += chars3[Math.floor(Math.random() * chars3.length)];
            pass += chars4[Math.floor(Math.random() * chars4.length)];
            for (var x = 0; x < length-4; x++) {
                pass += chars5[Math.floor(Math.random() * chars5.length)];
            }
            return pass; 
        }
       
    }
     

})();

