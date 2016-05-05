(function() {
  'use strict';

  angular
    .module('app')
    .factory('teacherService', teacherService);

  teacherService.$inject = ['$http', '$state'];

  function teacherService($http, $state){

    var service = {
      getTeacher: getTeacher,
      CreateTeacher: CreateTeacher,
      editTeacher : editTeacher,
      getProfile : getProfile 
    };

    return service;

    ////////////////////////////


    function getTeacher(sort, page , amount) {
        let url = 'http://janeto.us.to:7555/api/Teacher/Get?sort=' +sort + '&page=' +page + '&amount=' + amount ; 
        console.log(url) ; 
        return $http.get(url)
          .success(getTeacherComplete);
    }


    function getTeacherComplete(response) {
        return response.data;
    }     

    function CreateTeacher(teacher){
      console.log(teacher);
      $http({
                method: 'POST',
                url: 'http://janeto.us.to:7555/api/Teacher/Create',
                data: teacher
            }).then(function () {
                $state.go('start.teacher-list');
                console.log("create successfully");
            },
            function (error) {
                console.log("create failed");
                console.log(error);
            });
    }
    function editTeacher(teacher){
      console.log(teacher);
      var req = {
        method: 'PUT',
        url: 'http://janeto.us.to:7555/api/Teacher/UpdateProfile',
        data: teacher
      }

      $http(req).then(
              function sucess(response){
              $state.go('start.teacher-list', {}, { reload: true });
          },
          function error(response){
            console.log(response);
              // alert(response)
          }
      );
    }

    function getProfile(){
      return $http.get('api/Accounts/GetProfile')
            .success(getTeacherProfileComplete);
    }

    function getTeacherProfileComplete(response) {
        return response.data;
    }

  }
})();
