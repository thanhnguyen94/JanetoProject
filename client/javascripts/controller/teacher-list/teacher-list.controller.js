
(function() {
    angular
        .module('app')
        .controller('ListTeacherController', ListTeacherController)


    ListTeacherController.$inject = ['$scope','$http', 'teacherService', '$state','popupService'];

    function ListTeacherController($scope, $http, teacherService, $state, popupService) {
        var vm = this;
        vm.ListTeacher = [];
        vm.teacherData ={} ; 
        vm.actionEdit   = [];
        vm.actionDelete   = [];
        vm.tempTeacher = {};
        teacherService.getTeacher()            
            .success(function(data, _config){                    
                vm.teacherData.header = [ 'ID', 'UserName' , 'Email', 'First Name', 'Last Name','Phone Number'] ; 
                vm.teacherData.body = data.Data; 
                console.log(data);
                for(var obj of data.Data){
                    console.log(obj);
                    delete obj.Roles;
                }
                var obj =  vm.teacherData.body ; 
                obj.forEach(function(currentValue) {

                    var f = function(){
                        $state.go('start.teacher-edit',{"id":currentValue.Id});
                    }
                    var g = function(){
                        popupService.showPopup();                   
                    }
                    vm.actionEdit.push(f);
                    vm.actionDelete.push(g);
                });
                console.log(vm.actionDelete)         
        });
        // popupService.showPopup();            
    }  
})();
