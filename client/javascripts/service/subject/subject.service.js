(function() {
    'use strict';

    angular
        .module('app')
        .factory('subjectService', subjectService);

    subjectService.$inject = ['$http', '$state'];

    function subjectService($http, $state) {

        var service = {
            getSubject: getSubject,
            getSubjectCreatedByTeacher: getSubjectCreatedByTeacher,
            addSubject: addSubject,
            CreateSubjectAdmin: CreateSubjectAdmin,
            approveSubject: approveSubject
        };

        return service;

        ////////////////////////////



        function getSubject(sort, page, amount) {
            return $http.get('api/Subjects/Get?sort='+sort+'&page='+page+'&amount='+amount)
                .success(getListSubjectComplete);
        }


        function getListSubjectComplete(response) {
            return response.data;
        }

        function getSubjectCreatedByTeacher() {
            return $http.get('api/Requests/Get?amount=100')
                .success(getSubjectCreatedByTeacherComplete)
                .error(getSubjectCreatedByTeacherError);
        }

        function getSubjectCreatedByTeacherComplete(response) {
            return response.data;
        }

        function getSubjectCreatedByTeacherError(response) {
            console.log("getSubjectCreatedByTeacherError: " + response);
        }

        function addSubject(subject) {
            console.log(subject);
        }

        function CreateSubjectAdmin(subject) {
            var req = {
                method: 'POST',
                url: 'http://janeto.us.to:7555/api/Subjects/Create',
                data: subject
            }

            $http(req).then(
                function sucess(response) {
                    console.log(response);
                    $state.go('start.subject-list', {}, { reload: true });
                },
                function error(response) {
                    console.log(response);
                    // alert(response)
                }
            );
        }

        function approveSubject(request) {

            var id = request.Id;
            request.RequestID = id;
            delete request.Id;
            delete request.Course;
            delete request.CreatedBy;
            delete request.Subject;
            delete request.VerifiedBy;
            var req = {
                method: 'PUT',
                url: 'api/Requests/Verify',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: request
            }

            $http(req).then(
                function sucess(response) {
                    console.log(response);
                    $state.go('start.subject-approve', {}, { reload: true });
                },
                function error(response) {
                    console.log(response);
                    // alert(response)
                }
            );
        }
    }
})();
