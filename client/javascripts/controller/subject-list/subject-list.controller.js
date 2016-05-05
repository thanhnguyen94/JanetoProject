
(function() {
    angular
        .module('app')
        .controller('ListSubjectController', ListSubjectController)


    ListSubjectController.$inject = ['$scope','$http', 'subjectService'];

    function ListSubjectController($scope, $http, subjectService) {
        var vm = this;
        vm.ListSubject = [];
        vm.subjectData ={} ;
        vm.currentPage = 1;
        vm.amountRecord = 10 ;
        vm.sortBy = 'Name';
        subjectService.getSubject(vm.sortBy, vm.currentPage, vm.amountRecord)            
            .success(function(data){ 
                // console.log(data.Data);                   
                vm.subjectData.header = [ 'ID', 'Name' , 'Description' ] ; 
                for(var obj of data.Data){
                    // console.log(obj);
                    delete obj.IsApproved;
                }
                vm.subjectData.body = data.Data;
            });            
 
    }  

})();
