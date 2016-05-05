(function() {
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('app')
        .controller('CreateSubjectAdminController', CreateSubjectAdminController);

    CreateSubjectAdminController.$inject = ['$http','$scope','subjectService','popupService','teacherService','$state'];

    function CreateSubjectAdminController($http, $scope, subjectService,popupService,teacherService, $state) {
        var vm               = this;
        vm.Subject           = {};
        vm.nameSubject       = "";
        vm.nameTeacher       = "";
        vm.description       = "";
        vm.addSubject        = addSubject;
        vm.subjectData       = {};

        vm.listTeacher       = [];
        // vm.teacherNameArray = [];

        function addSubject(){
            vm.Subject.Name = vm.nameSubject;
            vm.Subject.nameTeacher = vm.nameTeacher;
            vm.Subject.Description = vm.description;
            event.preventDefault();
            event.stopPropagation();
            if(vm.Subject.Name!= null && vm.Subject.Description != null){
                delete vm.Subject.nameTeacher;
                // console.log(vm.Subject);
                subjectService.CreateSubjectAdmin(vm.Subject);
                vm.Subject = {};
            }
            else{
                popupService.showPopup();
                // alert('Subject name and Description must not be blank');
            }
        }

        teacherService.getTeacher().success(function (data){
            vm.listTeacher = data.Data;
            vm.nameTeacher = data.Data[0].UserName;
            // for(var i = 0 ; i < vm.listTeacher.length ; i++){
            //     vm.teacherNameArray.push(vm.listTeacher[i].UserName);
            // }
            console.log(vm.listTeacher);
        });

    }
})();
