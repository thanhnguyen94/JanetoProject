(function() {
    angular.module('app')
        .controller('CreateNewPasswordController' , CreateNewPasswordController) ;

    CreateNewPasswordController.$inject =['$scope' , '$state'  , '$http' , '$stateParams'  ,'$location' ];

    function CreateNewPasswordController ($scope , $state , $http , $stateParams , $location) {
       var vm = this ; 
       vm.username = $location.search().userName ; 
       vm.password = '' ; 
       vm.passwordConfirm = '' ; 
       vm.code =$location.search().code ; 
       vm.createNewPassword = createNewPassword ; 
    

       $scope.$watch('vm.username' , function (argument) {
        vm.username = argument ;        
       })  ; 
       $scope.$watch('vm.code' , function (argument) {
          vm.code = argument ; 
          console.log(vm.code) ; 
       })  ; 

        function createNewPassword () {
          console.log(vm.password) ; 
          console.log(vm.passwordConfirm) ; 
          if(vm.username && vm.password && vm.passwordConfirm && vm.code) { 
              if(vm.password != vm.passwordConfirm) { 
                vm.errorMessage = 'Passwords is not same!' ; 
              } else { 
                let url =  "http://janeto.us.to:7555/api/Accounts/ResetPassword"  ;
                let body = {
                   "UserName": vm.username,
                    "NewPassword": vm.password,
                    "ConfirmPassword": vm.passwordConfirm,
                    "Code": vm.code
                }
                $http.put (url, body)
                .then(function success (reponse) {
                  console.log("success") ;
                  vm.errorMessage = '' ; 
                } , function fail (response) {
                   console.log(response) ; 
                    vm.errorMessage = "Error: " + response.data.Errors[0] ; 
                }) ; 
             
              }
          }
       }


    }
  


})() ;