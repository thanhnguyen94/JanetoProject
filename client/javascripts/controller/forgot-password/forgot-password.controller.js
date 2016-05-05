/**
 * Created by Ninh on 12/04/2016.
 */
(function() {
    angular.module('app')
        .controller('ForgotPasswordController' , ForgotPasswordController) ;
    ForgotPasswordController.$inject =['$scope' , '$state'  , '$http'];

    function ForgotPasswordController($scope ,$state , $http) {
        var vm = this ;
        vm.username='' ;
        let urlCreateNewPassword = window.location.protocol+"//" +  window.location.host+ "/#/create-new-password" ;    
    

        vm.sendPassword = function () {
            if(vm.username) {
                var bodyData = { 
                    username : vm.username  , 
                    ResetUrl : urlCreateNewPassword 
                }
                console.log(bodyData) ; 
               $http.post( "http://janeto.us.to:7555/api/Accounts/ResetPassword" ,  bodyData)
               .then( function sucesss(response) {
                 $state.go('forgot-password-success');
               }) ; 
             
            }
        }

    }



})() ;